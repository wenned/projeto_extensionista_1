import { useRouter } from 'next/router'

export default function PublicoAlvo() {
  const router = useRouter()

  const publicos = [
    {
      id: 1,
      grupo: "Alunos",
      descricao: "Divulgue seus projetos, acompanhe atividades e participe de eventos",
      icone: "🎓",
      beneficios: [
        "Mostrar seu trabalho acadêmico",
        "Participar de eventos escolares",
        "Acompanhar atividades e prazos",
        "Conectar-se com outros estudantes"
      ],
      action: "Ver Meus Projetos",
      path: "/login"
    },
    {
      id: 2,
      grupo: "Professores",
      descricao: "Organize e publique eventos, projetos pedagógicos e acompanhe alunos",
      icone: "👨‍🏫",
      beneficios: [
        "Divulgar projetos pedagógicos",
        "Organizar eventos educacionais",
        "Compartilhar materiais didáticos",
        "Acompanhar desenvolvimento dos alunos"
      ],
      action: "Gerenciar Conteúdo",
      path: "/login"
    },
    {
      id: 3,
      grupo: "Famílias",
      descricao: "Acompanhe a vida escolar, veja conquistas e participe da comunidade",
      icone: "👨‍👩‍👧‍👦",
      beneficios: [
        "Acompanhar atividades dos filhos",
        "Ver projetos e conquistas",
        "Participar de eventos escolares",
        "Comunicar-se com professores"
      ],
      action: "Acompanhar Estudante",
      path: "/login"
    },
    {
      id: 4,
      grupo: "Funcionários",
      descricao: "Comunique ações, avisos e integre-se à comunidade escolar",
      icone: "💼",
      beneficios: [
        "Divulgar avisos importantes",
        "Comunicar ações administrativas",
        "Integrar-se à comunidade",
        "Participar da gestão escolar"
      ],
      action: "Publicar Avisos",
      path: "/login"
    }
  ]

  return (
    <section id="sobre" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Para Nossa Comunidade Escolar
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Uma plataforma desenvolvida para atender e integrar todos os membros da nossa comunidade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {publicos.map((publico) => (
            <div key={publico.id} className="card group hover:shadow-xl transition-all duration-300 h-full flex flex-col">
              <div className="p-6 flex-1">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-4 inline-block group-hover:scale-110 transition-transform duration-300">
                    {publico.icone}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {publico.grupo}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {publico.descricao}
                  </p>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Benefícios:</h4>
                  <ul className="space-y-1.5">
                    {publico.beneficios.map((beneficio, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {beneficio}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="p-6 pt-0 border-t border-gray-100">
                <button
                  onClick={() => router.push(publico.path)}
                  className="w-full text-primary-600 hover:text-primary-700 border border-primary-600 hover:border-primary-700 font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm"
                >
                  {publico.action}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Junte-se à Nossa Comunidade
            </h3>
            <p className="text-gray-600 mb-6">
              Cadastre-se agora e comece a participar ativamente da vida escolar. 
              Compartilhe conhecimentos, colabore em projetos e faça parte dessa jornada educacional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/register')}
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
              >
                Criar Conta Gratuita
              </button>
              <button
                onClick={() => router.push('/login')}
                className="bg-white hover:bg-gray-50 text-primary-600 border border-primary-600 font-medium py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
              >
                Já Tenho Conta
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}