const eventos = [
  {
    id: 1,
    titulo: "Reunião de Pais e Mestres",
    data: "2024-03-15",
    horario: "19:00",
    local: "Auditório Principal",
    tipo: "Reunião",
    descricao: "Reunião para discussão do planejamento do semestre letivo."
  },
  {
    id: 2,
    titulo: "Festa Junina Escolar",
    data: "2024-06-22",
    horario: "14:00 - 22:00",
    local: "Quadra Esportiva",
    tipo: "Festividade",
    descricao: "Tradicional festa junina com comidas típicas e quadrilha."
  },
  {
    id: 3,
    titulo: "Simulado ENEM",
    data: "2024-04-10",
    horario: "08:00 - 13:00",
    local: "Salas de Aula",
    tipo: "Avaliação",
    descricao: "Simulado preparatório para o ENEM para alunos do ensino médio."
  }
]

export default function Eventos() {
  const formatarData = (dataString) => {
    const data = new Date(dataString)
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <section id="eventos" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Próximos Eventos
          </h2>
          <p className="text-xl text-gray-600">
            Fique por dentro da agenda de eventos da escola
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {eventos.map((evento) => (
            <div key={evento.id} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {evento.tipo}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-600">
                    {new Date(evento.data).getDate()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(evento.data).toLocaleDateString('pt-BR', { month: 'long' })}
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {evento.titulo}
              </h3>
              <p className="text-gray-600 mb-4">
                {evento.descricao}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {evento.horario}
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {evento.local}
                  </div>
                </div>
                <button className="btn-primary text-sm">
                  Mais Informações
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-secondary">
            Calendário Completo
          </button>
        </div>
      </div>
    </section>
  )
}
