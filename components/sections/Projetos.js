import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Projetos() {
  const [projetos, setProjetos] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchProjetos()
  }, [])

  const fetchProjetos = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/projetos?limit=3&status=EM_ANDAMENTO')
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-64 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projetos" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Projetos em Destaque
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça os projetos inovadores desenvolvidos por nossa comunidade escolar
          </p>
        </div>

        {projetos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum projeto ativo no momento</h3>
            <p className="text-gray-600 mb-4">Novos projetos serão publicados em breve!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projetos.map((projeto) => {
              const status = getStatusBadge(projeto.status)
              return (
                <div key={projeto.id} className="card group hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                        {projeto.categoria}
                      </span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {projeto.titulo}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
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
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-2">
                          <span className="text-primary-600 font-medium text-sm">
                            {projeto.user?.name?.charAt(0) || 'U'}
                          </span>
                        </div>
                        <span className="text-gray-700">{projeto.user?.name || 'Usuário'}</span>
                      </div>
                      <button
                        onClick={() => router.push(`/projetos/${projeto.id}`)}
                        className="btn-primary text-sm px-4 py-2"
                      >
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
 
        <div className="text-center mt-12">
          <Link 
            href="/projetos" 
            className="inline-flex items-center btn-secondary px-6 py-3 text-lg font-medium"
          >
            Ver Todos os Projetos
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}