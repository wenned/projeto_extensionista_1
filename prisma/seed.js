const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed para SQLite...')
  
  // Limpar dados existentes
  console.log('🧹 Limpando dados existentes...')
  await prisma.inscricaoEvento.deleteMany()
  await prisma.participanteProjeto.deleteMany()
  await prisma.imagem.deleteMany()
  await prisma.galeria.deleteMany()
  await prisma.noticia.deleteMany()
  await prisma.evento.deleteMany()
  await prisma.projeto.deleteMany()
  await prisma.user.deleteMany()
  
  console.log('👥 Criando usuários...')
  
  const hashedPassword = await bcrypt.hash('senha123', 10)
  
  // Criar usuários de exemplo
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
  
  console.log('📊 Criando projetos...')
  
  // Criar projetos de exemplo
  const projeto1 = await prisma.projeto.create({
    data: {
      titulo: 'Feira de Ciências 2024',
      descricao: 'Projeto interdisciplinar com experimentos científicos',
      descricaoLonga: 'Projeto que envolve todas as turmas do ensino médio na criação e apresentação de experimentos científicos inovadores.',
      categoria: 'Ciências',
      status: 'EM_ANDAMENTO',
      dataInicio: new Date('2024-01-15'),
      dataFim: new Date('2024-06-30'),
      turma: 'Ensino Médio',
      responsavel: 'Prof. Maria Silva',
      criadoPor: professor.id
    }
  })
  
  const projeto2 = await prisma.projeto.create({
    data: {
      titulo: 'Olimpíada de Matemática',
      descricao: 'Preparação para OBMEP com aulas extras e simulados',
      descricaoLonga: 'Projeto de preparação intensiva para a Olimpíada Brasileira de Matemática.',
      categoria: 'Matemática',
      status: 'EM_ANDAMENTO',
      dataInicio: new Date('2024-02-01'),
      dataFim: new Date('2024-08-30'),
      turma: 'Fundamental II',
      responsavel: 'Prof. João Santos',
      criadoPor: professor.id
    }
  })
  
  const projeto3 = await prisma.projeto.create({
    data: {
      titulo: 'Clube de Leitura',
      descricao: 'Encontros semanais para discussão de livros',
      descricaoLonga: 'Clube de leitura que reúne estudantes interessados em literatura.',
      categoria: 'Literatura',
      status: 'EM_ANDAMENTO',
      dataInicio: new Date('2024-01-10'),
      turma: 'Todos os anos',
      responsavel: 'Prof. Ana Costa',
      criadoPor: professor.id
    }
  })
  
  console.log('📅 Criando eventos...')
  
  // Criar eventos de exemplo
  const evento1 = await prisma.evento.create({
    data: {
      titulo: 'Reunião de Pais e Mestres',
      descricao: 'Reunião para discussão do planejamento do semestre',
      descricaoLonga: 'Reunião com todos os pais e responsáveis para apresentação do planejamento.',
      tipo: 'REUNIAO',
      data: new Date('2024-03-15T19:00:00'),
      horarioInicio: '19:00',
      horarioFim: '21:00',
      local: 'Auditório Principal',
      publicoAlvo: JSON.stringify(['PAIS', 'PROFESSORES']), // JSON string
      criadoPor: admin.id
    }
  })
  
  const evento2 = await prisma.evento.create({
    data: {
      titulo: 'Festa Junina Escolar',
      descricao: 'Tradicional festa junina com comidas típicas e quadrilha',
      descricaoLonga: 'Evento cultural com apresentações de quadrilha e comidas típicas.',
      tipo: 'FESTIVIDADE',
      data: new Date('2024-06-22T14:00:00'),
      horarioInicio: '14:00',
      horarioFim: '22:00',
      local: 'Quadra Esportiva',
      publicoAlvo: JSON.stringify(['ALUNOS', 'PAIS', 'PROFESSORES', 'COMUNIDADE']),
      criadoPor: admin.id
    }
  })
  
  const evento3 = await prisma.evento.create({
    data: {
      titulo: 'Simulado ENEM',
      descricao: 'Simulado preparatório para o ENEM',
      descricaoLonga: 'Simulado completo seguindo o formato do ENEM.',
      tipo: 'AVALIACAO',
      data: new Date('2024-04-10T08:00:00'),
      horarioInicio: '08:00',
      horarioFim: '13:00',
      local: 'Salas de Aula',
      publicoAlvo: JSON.stringify(['ALUNOS']),
      criadoPor: professor.id
    }
  })
  
  console.log('📰 Criando notícias...')
  
  // Criar notícias de exemplo
  const noticia1 = await prisma.noticia.create({
    data: {
      titulo: 'Escola é destaque em Olimpíada de Matemática',
      conteudo: 'Nossos alunos alcançaram excelentes resultados na última OBMEP.',
      resumo: 'Alunos da nossa escola conquistam medalhas na OBMEP',
      categoria: 'Conquistas',
      destaque: true,
      tags: JSON.stringify(['matemática', 'conquistas', 'obmep', 'educação']), // JSON string
      criadoPor: admin.id
    }
  })
  
  const noticia2 = await prisma.noticia.create({
    data: {
      titulo: 'Projeto de Robótica é selecionado para feira nacional',
      conteudo: 'O projeto "Robótica Educacional" foi selecionado para a Feira Nacional.',
      resumo: 'Projeto de robótica representa escola em feira nacional',
      categoria: 'Projetos',
      destaque: true,
      tags: JSON.stringify(['robótica', 'tecnologia', 'ciências']),
      criadoPor: professor.id
    }
  })
  
  // Adicionar participantes aos projetos
  console.log('👥 Adicionando participantes...')
  
  await prisma.participanteProjeto.create({
    data: {
      projetoId: projeto1.id,
      userId: aluno.id,
      funcao: 'Pesquisador'
    }
  })
  
  // Adicionar inscrições em eventos
  console.log('🎟️ Adicionando inscrições...')
  
  await prisma.inscricaoEvento.create({
    data: {
      eventoId: evento1.id,
      userId: admin.id,
      status: 'CONFIRMADA'
    }
  })
  
  await prisma.inscricaoEvento.create({
    data: {
      eventoId: evento2.id,
      userId: aluno.id,
      status: 'CONFIRMADA'
    }
  })
  
  console.log('✅ Seed completado com sucesso!')
  console.log('📋 Dados criados:')
  console.log(`   👤 Usuários: 3`)
  console.log(`   📊 Projetos: 3`)
  console.log(`   📅 Eventos: 3`)
  console.log(`   📰 Notícias: 2`)
  console.log('\n🔑 Credenciais para teste:')
  console.log('   Admin: admin@escola.com / senha123')
  console.log('   Professor: professor@escola.com / senha123')
  console.log('   Aluno: aluno@escola.com / senha123')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })