import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }
  
  try {
    const { email, password } = req.body
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' })
    }
    
    const user = await prisma.user.findUnique({
      where: { email }
    })
    
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' })
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password)
    
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas' })
    }
    
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        name: user.name
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )
    
    // Remove a senha da resposta
    const { password: _, ...userWithoutPassword } = user
    
    return res.status(200).json({
      user: userWithoutPassword,
      token
    })
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao fazer login' })
  }
}