const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed simplificado...')
  
  const hashedPassword = await bcrypt.hash('senha123', 10)
  
  // Criar usuários
  const admin = await prisma.user.create({
    data: {
      email: 'admin@escola.com',
      name: 'Administrador',
      password: hashedPassword,
      role: 'ADMIN'
    }
  })
  
  const professor = await prisma.user.create({
    data: {
      email: 'professor@escola.com',
      name: 'Professor Silva',
      password: hashedPassword,
      role: 'PROFESSOR',
      turma: '3º Ano EM'
    }
  })
  
  const aluno = await prisma.user.create({
    data: {
      email: 'aluno@escola.com',
      name: 'João Aluno',
      password: hashedPassword,
      role: 'ALUNO',
      turma: '3º Ano EM',
      matricula: '20230001'
    }
  })
  
  // Criar projetos
  const projeto = await prisma.projeto.create({
    data: {
      titulo: 'Feira de Ciências 2024',
      descricao: 'Projeto interdisciplinar com experimentos científicos',
      categoria: 'Ciências',
      status: 'EM_ANDAMENTO',
      dataInicio: new Date('2024-01-15'),
      dataFim: new Date('2024-06-30'),
      turma: 'Ensino Médio',
      responsavel: 'Prof. Maria Silva',
      criadoPor: professor.id
    }
  })
  
  // Criar eventos
  const evento = await prisma.evento.create({
    data: {
      titulo: 'Reunião de Pais e Mestres',
      descricao: 'Reunião para discussão do planejamento',
      tipo: 'REUNIAO',
      data: new Date('2024-03-15'),
      horarioInicio: '19:00',
      horarioFim: '21:00',
      local: 'Auditório Principal',
      publicoAlvo: '["PAIS", "PROFESSORES"]',
      criadoPor: admin.id
    }
  })
  
  // Criar notícia
  await prisma.noticia.create({
    data: {
      titulo: 'Escola é destaque em Olimpíada',
      conteudo: 'Nossos alunos alcançaram excelentes resultados.',
      resumo: 'Conquistas na OBMEP',
      categoria: 'Conquistas',
      destaque: true,
      tags: '["matemática", "conquistas"]',
      criadoPor: admin.id
    }
  })
  
  console.log('✅ Seed completado!')
  console.log('📋 Dados criados:')
  console.log('   👤 3 usuários')
  console.log('   📊 1 projeto')
  console.log('   📅 1 evento')
  console.log('   📰 1 notícia')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
