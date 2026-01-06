import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export default function MeusProjetos() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [projetos, setProjetos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token || !userData) {
      router.push('/login')
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      fetchMeusProjetos(parsedUser.id)
    } catch (error) {
      console.error('Erro ao carregar:', error)
      router.push('/login')
    }
  }, [router])

  const fetchMeusProjetos = async (userId) => {
    try {
      setLoading(true)
      // Por enquanto, busca todos os projetos
      // Futuramente: filtrar por projetos do usuário
      const response = await fetch('/api/projetos')
      const data = await response.json()
      setProjetos(data.projetos || [])
    } catch (error) {
      console.error('Erro ao buscar projetos:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      'EM_ANDAMENTO': { color: 'bg-green-100 text-green-800', label: 'Em Andamento' },
      'CONCLUIDO': { color: 'bg-blue-100 text-blue-800', label: 'Concluído' },
      'RASCUNHO': { color: 'bg-gray-100 text-gray-800', label: 'Rascunho' },
      'CANCELADO': { color: 'bg-red-100 text-red-800', label: 'Cancelado' }
    }
    return statusConfig[status] || { color: 'bg-gray-100 text-gray-800', label: status }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Meus Projetos</h1>
            <p className="text-gray-600 mt-2">
              Gerencie os projetos que você criou ou está participando
            </p>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => router.push('/projetos/novo')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                + Criar Novo Projeto
              </button>
              <button
                onClick={() => router.push('/projetos')}
                className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Ver Todos os Projetos
              </button>
            </div>
          </div>

          {projetos.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Você ainda não tem projetos</h3>
              <p className="text-gray-600 mb-6">Comece criando seu primeiro projeto ou participe de um existente</p>
              <div className="space-x-4">
                <button
                  onClick={() => router.push('/projetos/novo')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Criar Primeiro Projeto
                </button>
                <button
                  onClick={() => router.push('/projetos')}
                  className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Explorar Projetos
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projetos.map((projeto) => {
                const status = getStatusBadge(projeto.status)
                return (
                  <div key={projeto.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {projeto.categoria}
                        </span>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {projeto.titulo}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {projeto.descricao}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {new Date(projeto.dataInicio).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="text-right">
                          <span className="font-medium">{projeto.turma}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                            <span className="text-blue-600 font-medium text-sm">
                              {projeto.user?.name?.charAt(0) || 'U'}
                            </span>
                          </div>
                          <span className="text-sm text-gray-700">{projeto.user?.name || 'Usuário'}</span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => router.push(`/projetos/${projeto.id}`)}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Ver
                          </button>
                          {user?.id === projeto.criadoPor && (
                            <button
                              onClick={() => router.push(`/projetos/${projeto.id}/editar`)}
                              className="text-sm text-gray-600 hover:text-gray-700 font-medium"
                            >
                              Editar
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Projetos em que está participando */}
          {projetos.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Projetos que Participo</h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center py-8">
                  <p className="text-gray-500">Você ainda não está participando de nenhum projeto</p>
                  <button
                    onClick={() => router.push('/projetos')}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Explore projetos disponíveis →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}