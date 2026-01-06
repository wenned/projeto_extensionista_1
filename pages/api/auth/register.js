import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }
  
  try {
    const { email, password, name, role, turma, matricula } = req.body
    
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Dados obrigatórios faltando' })
    }
    
    // Verifica se o email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })
    
    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado' })
    }
    
    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || 'ALUNO',
        turma,
        matricula
      }
    })
    
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
    
    return res.status(201).json({
      user: userWithoutPassword,
      token
    })
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar usuário' })
  }
}