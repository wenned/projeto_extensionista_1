import { prisma } from '@/lib/prisma'
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' })
    }

    const decoded = verify(token, JWT_SECRET)
    
    // Verificar se o usuário está atualizando seu próprio perfil
    if (decoded.userId !== id && decoded.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Acesso não autorizado' })
    }

    const { name, email, turma, matricula } = req.body

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        turma,
        matricula,
        updatedAt: new Date()
      }
    })

    // Remove a senha da resposta
    const { password, ...userWithoutPassword } = updatedUser

    res.status(200).json(userWithoutPassword)
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Email já está em uso' })
    }
    
    res.status(500).json({ error: 'Erro ao atualizar usuário' })
  }
}