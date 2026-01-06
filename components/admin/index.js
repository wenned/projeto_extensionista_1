import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import SimpleAdminLayout from '@/components/admin/SimpleAdminLayout'

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    projetos: 0,
    eventos: 0,
    usuarios: 0,
    noticias: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/dashboard')
        const data = await response.json()
        
        setStats({
          projetos: data.estatisticas?.totalProjetos || 0,
          eventos: data.estatisticas?.totalEventos || 0,
          usuarios: data.estatisticas?.totalUsuarios || 0,
          noticias: data.estatisticas?.totalNoticias || 0
        })
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error)
        // Usar dados mock se API falhar
        setStats({
          projetos: 10,
          eventos: 5,
          usuarios: 50,
          noticias: 3
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const statCards = [
    {
      title: 'Total de Projetos',
      value: stats.projetos,
      icon: '📊',
      color: 'bg-blue-500',
      link: '/admin/projetos'
    },
    {
      title: 'Eventos Ativos',
      value: stats.eventos,
      icon: '📅',
      color: 'bg-green-500',
      link: '/admin/eventos'
    },
    {
      title: 'Usuários Registrados',
      value: stats.usuarios,
      icon: '👥',
      color: 'bg-purple-500',
      link: '/admin/usuarios'
    },
    {
      title: 'Notícias Publicadas',
      value: stats.noticias,
      icon: '📰',
      color: 'bg-yellow-500',
      link: '/admin/noticias'
    }
  ]

  if (loading) {
    return (
      <SimpleAdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </SimpleAdminLayout>
    )
  }

  return (
    <SimpleAdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
            <p className="text-gray-600">Bem-vindo ao painel de administração</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => router.push('/admin/projetos/novo')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              + Novo Projeto
            </button>
            <button
              onClick={() => router.push('/admin/eventos/novo')}
              className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              + Novo Evento
            </button>
          </div>
        </div>
        
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200 border border-gray-100"
              onClick={() => router.push(stat.link)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold mt-2 text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} text-white p-3 rounded-lg`}>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-blue-600 font-medium hover:text-blue-700">
                  Ver detalhes →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Conteúdo principal */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => router.push('/admin/projetos/novo')}
              className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">📝</div>
                <p className="font-medium text-gray-900">Criar Projeto</p>
                <p className="text-sm text-gray-500 mt-1">Novo projeto escolar</p>
              </div>
            </button>
            
            <button
              onClick={() => router.push('/admin/eventos/novo')}
              className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">🎉</div>
                <p className="font-medium text-gray-900">Agendar Evento</p>
                <p className="text-sm text-gray-500 mt-1">Novo evento escolar</p>
              </div>
            </button>
            
            <button
              onClick={() => router.push('/admin/noticias/nova')}
              className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">📰</div>
                <p className="font-medium text-gray-900">Publicar Notícia</p>
                <p className="text-sm text-gray-500 mt-1">Nova notícia escolar</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </SimpleAdminLayout>
  )
}