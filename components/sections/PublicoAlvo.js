const publicos = [
  {
    id: 1,
    grupo: "Alunos",
    descricao: "Divulguem seus projetos e acompanhem as atividades escolares",
    icone: "🎓",
    beneficios: [
      "Mostrar seu trabalho",
      "Participar de eventos",
      "Acompanhar atividades"
    ]
  },
  {
    id: 2,
    grupo: "Professores",
    descricao: "Organizem e publiquem eventos e projetos pedagógicos",
    icone: "👨‍🏫",
    beneficios: [
      "Divulgar projetos",
      "Organizar eventos",
      "Compartilhar conquistas"
    ]
  },
  {
    id: 3,
    grupo: "Famílias",
    descricao: "Mantenham-se informadas sobre a vida escolar dos estudantes",
    icone: "👨‍👩‍👧‍👦",
    beneficios: [
      "Acompanhar atividades",
      "Ver conquistas",
      "Participar de eventos"
    ]
  },
  {
    id: 4,
    grupo: "Funcionários",
    descricao: "Comuniquem ações e avisos relevantes para a comunidade",
    icone: "💼",
    beneficios: [
      "Divulgar avisos",
      "Comunicar ações",
      "Integrar comunidade"
    ]
  }
]

export default function PublicoAlvo() {
  return (
    <section id="sobre" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Para Nossa Comunidade
          </h2>
          <p className="text-xl text-gray-600">
            Uma plataforma desenvolvida para atender todos os membros da comunidade escolar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {publicos.map((publico) => (
            <div key={publico.id} className="card p-6 text-center group hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {publico.icone}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {publico.grupo}
              </h3>
              <p className="text-gray-600 mb-4">
                {publico.descricao}
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                {publico.beneficios.map((beneficio, index) => (
                  <li key={index}>• {beneficio}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
