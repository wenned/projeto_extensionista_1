import { prisma } from '@/lib/prisma'
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export default async function handler(req, res) {
  // GET - Listar projetos
  if (req.method === 'GET') {
    try {
      const { categoria, status, page = 1, limit = 10 } = req.query
      
      const where = {}
      
      if (categoria) where.categoria = categoria
      if (status) where.status = status
      
      const projetos = await prisma.projeto.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              role: true,
            }
          },
          _count: {
            select: {
              participantes: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip: (page - 1) * limit,
        take: parseInt(limit)
      })
      
      const total = await prisma.projeto.count({ where })
      
      return res.status(200).json({
        projetos,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      })
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar projetos' })
    }
  }
  
  // POST - Criar projeto
  if (req.method === 'POST') {
    try {
      const token = req.headers.authorization?.split(' ')[1]
      
      if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' })
      }
      
      const decoded = verify(token, JWT_SECRET)
      
      const {
        titulo,
        descricao,
        descricaoLonga,
        categoria,
        status,
        imagemUrl,
        dataInicio,
        dataFim,
        turma,
        responsavel
      } = req.body
      
      const projeto = await prisma.projeto.create({
        data: {
          titulo,
          descricao,
          descricaoLonga,
          categoria,
          status: status || 'EM_ANDAMENTO',
          imagemUrl,
          dataInicio: new Date(dataInicio),
          dataFim: dataFim ? new Date(dataFim) : null,
          turma,
          responsavel,
          criadoPor: decoded.userId
        }
      })
      
      return res.status(201).json(projeto)
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar projeto' })
    }
  }
  
  return res.status(405).json({ error: 'Método não permitido' })
}