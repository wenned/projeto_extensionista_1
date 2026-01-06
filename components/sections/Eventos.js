import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Eventos() {
  const [eventos, setEventos] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchEventos()
  }, [])

  const fetchEventos = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/eventos?limit=3&future=true')
      const data = await response.json()
      setEventos(data.eventos || [])
    } catch (error) {
      console.error('Erro ao buscar eventos:', error)
    } finally {
      setLoading(false)
    }
  }

  const getTipoBadge = (tipo) => {
    const tipoConfig = {
      'REUNIAO': { color: 'bg-blue-100 text-blue-800', label: 'Reunião' },
      'PALESTRA': { color: 'bg-green-100 text-green-800', label: 'Palestra' },
      'WORKSHOP': { color: 'bg-purple-100 text-purple-800', label: 'Workshop' },
      'FESTIVIDADE': { color: 'bg-yellow-100 text-yellow-800', label: 'Festividade' },
      'ESPORTIVO': { color: 'bg-red-100 text-red-800', label: 'Esportivo' },
      'CULTURAL': { color: 'bg-indigo-100 text-indigo-800', label: 'Cultural' },
      'AVALIACAO': { color: 'bg-gray-100 text-gray-800', label: 'Avaliação' }
    }
    return tipoConfig[tipo] || { color: 'bg-gray-100 text-gray-800', label: tipo }
  }

  const formatarData = (dataString) => {
    const data = new Date(dataString)
    return {
      dia: data.getDate(),
      mes: data.toLocaleDateString('pt-BR', { month: 'long' }),
      dataCompleta: data.toLocaleDateString('pt-BR'),
      hora: data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }
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
    <section id="eventos" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Próximos Eventos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fique por dentro da agenda de eventos e atividades escolares
          </p>
        </div>

        {eventos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum evento programado</h3>
            <p className="text-gray-600 mb-4">Novos eventos serão anunciados em breve!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {eventos.map((evento) => {
              const tipo = getTipoBadge(evento.tipo)
              const dataFormatada = formatarData(evento.data)
              
              return (
                <div key={evento.id} className="card hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${tipo.color}`}>
                          {tipo.label}
                        </span>
                      </div>
                      <div className="text-center bg-primary-50 p-3 rounded-lg">
                        <div className="text-2xl font-bold text-primary-600">
                          {dataFormatada.dia}
                        </div>
                        <div className="text-sm font-medium text-primary-800 uppercase">
                          {dataFormatada.mes}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-primary-600 transition-colors cursor-pointer"
                        onClick={() => router.push(`/eventos/${evento.id}`)}>
                      {evento.titulo}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 line-clamp-2">
                      {evento.descricao}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{dataFormatada.dataCompleta} • {evento.horarioInicio}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{evento.local}</span>
                      </div>
                      {evento.publicoAlvo && evento.publicoAlvo.length > 0 && (
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13 0A9 9 0 008 3a9 9 0 00-6 16.596m15-4.354a9 9 0 01-18 0" />
                          </svg>
                          <span>Público: {evento.publicoAlvo.join(', ')}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-2">
                          <span className="text-primary-600 font-medium text-sm">
                            {evento.user?.name?.charAt(0) || 'O'}
                          </span>
                        </div>
                        <span className="text-sm text-gray-700">Organizado por {evento.user?.name || 'Organizador'}</span>
                      </div>
                      <button
                        onClick={() => router.push(`/eventos/${evento.id}`)}
                        className="btn-primary text-sm px-4 py-2"
                      >
                        Participar
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
            href="/eventos" 
            className="inline-flex items-center btn-primary px-6 py-3 text-lg font-medium"
          >
            Ver Calendário Completo
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}