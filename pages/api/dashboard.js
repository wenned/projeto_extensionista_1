import { prisma } from '@/lib/prisma'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    // Contagem total
    const [
      totalProjetos,
      totalEventos,
      totalUsuarios,
      totalNoticias
    ] = await Promise.all([
      prisma.projeto.count(),
      prisma.evento.count(),
      prisma.user.count(),
      prisma.noticia.count()
    ])

    // Projetos por status
    const projetosPorStatus = await prisma.projeto.groupBy({
      by: ['status'],
      _count: true
    })

    // Eventos próximos
    const eventosProximos = await prisma.evento.findMany({
      where: {
        data: {
          gte: new Date()
        }
      },
      take: 5,
      orderBy: {
        data: 'asc'
      },
      include: {
        _count: {
          select: { inscricoes: true }
        }
      }
    })

    // Últimas notícias
    const ultimasNoticias = await prisma.noticia.findMany({
      take: 3,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            name: true
          }
        }
      }
    })

    // Atividade recente (combina tudo)
    const atividadeRecente = await Promise.all([
      prisma.projeto.findMany({
        take: 5,
        orderBy: { updatedAt: 'desc' },
        include: { user: { select: { name: true } } }
      }),
      prisma.evento.findMany({
        take: 5,
        orderBy: { updatedAt: 'desc' },
        include: { user: { select: { name: true } } }
      })
    ]).then(([projetos, eventos]) => {
      return [...projetos, ...eventos]
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 5)
    })

    res.status(200).json({
      estatisticas: {
        totalProjetos,
        totalEventos,
        totalUsuarios,
        totalNoticias
      },
      projetosPorStatus,
      eventosProximos,
      ultimasNoticias,
      atividadeRecente
    })
  } catch (error) {
    console.error('Erro no dashboard:', error)
    res.status(500).json({ error: 'Erro ao carregar dados do dashboard' })
  }
}