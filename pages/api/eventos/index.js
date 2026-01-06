import { prisma } from '@/lib/prisma'
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export default async function handler(req, res) {
  // GET - Listar eventos
  if (req.method === 'GET') {
    try {
      const { tipo, page = 1, limit = 10, future = true } = req.query
      
      const where = {}
      
      if (tipo) where.tipo = tipo
      
      if (future === 'true') {
        where.data = {
          gte: new Date()
        }
      }
      
      const eventos = await prisma.evento.findMany({
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
              inscricoes: true
            }
          }
        },
        orderBy: {
          data: 'asc'
        },
        skip: (page - 1) * limit,
        take: parseInt(limit)
      })
      
      const total = await prisma.evento.count({ where })
      
      return res.status(200).json({
        eventos,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      })
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar eventos' })
    }
  }
  
  // POST - Criar evento
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
        tipo,
        data,
        horarioInicio,
        horarioFim,
        local,
        imagemUrl,
        publicoAlvo
      } = req.body
      
      const evento = await prisma.evento.create({
        data: {
          titulo,
          descricao,
          descricaoLonga,
          tipo,
          data: new Date(data),
          horarioInicio,
          horarioFim,
          local,
          imagemUrl,
          publicoAlvo,
          criadoPor: decoded.userId
        }
      })
      
      return res.status(201).json(evento)
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar evento' })
    }
  }
  
  return res.status(405).json({ error: 'Método não permitido' })
}