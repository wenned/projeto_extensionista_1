import { prisma } from '@/lib/prisma'
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export default async function handler(req, res) {
  const { id } = req.query
  
  // GET - Buscar projeto específico
  if (req.method === 'GET') {
    try {
      const projeto = await prisma.projeto.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true
            }
          },
          participantes: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  role: true
                }
              }
            }
          }
        }
      })
      
      if (!projeto) {
        return res.status(404).json({ error: 'Projeto não encontrado' })
      }
      
      return res.status(200).json(projeto)
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar projeto' })
    }
  }
  
  // PUT - Atualizar projeto
  if (req.method === 'PUT') {
    try {
      const token = req.headers.authorization?.split(' ')[1]
      
      if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' })
      }
      
      const decoded = verify(token, JWT_SECRET)
      
      const projeto = await prisma.projeto.findUnique({
        where: { id }
      })
      
      if (!projeto) {
        return res.status(404).json({ error: 'Projeto não encontrado' })
      }
      
      // Verifica se o usuário é o criador ou admin
      if (projeto.criadoPor !== decoded.userId && decoded.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Acesso não autorizado' })
      }
      
      const updatedProjeto = await prisma.projeto.update({
        where: { id },
        data: req.body
      })
      
      return res.status(200).json(updatedProjeto)
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar projeto' })
    }
  }
  
  // DELETE - Excluir projeto
  if (req.method === 'DELETE') {
    try {
      const token = req.headers.authorization?.split(' ')[1]
      
      if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' })
      }
      
      const decoded = verify(token, JWT_SECRET)
      
      const projeto = await prisma.projeto.findUnique({
        where: { id }
      })
      
      if (!projeto) {
        return res.status(404).json({ error: 'Projeto não encontrado' })
      }
      
      // Apenas admin pode excluir
      if (decoded.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Acesso não autorizado' })
      }
      
      await prisma.projeto.delete({
        where: { id }
      })
      
      return res.status(200).json({ message: 'Projeto excluído com sucesso' })
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao excluir projeto' })
    }
  }
  
  return res.status(405).json({ error: 'Método não permitido' })
}