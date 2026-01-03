const projetos = [
  {
    id: 1,
    titulo: "Feira de Ciências 2025",
    descricao: "Projeto interdisciplinar envolvendo experimentos científicos desenvolvidos pelos alunos do ensino médio.",
    categoria: "Ciências",
    turma: "2º Ano EM",
    responsavel: "Prof. Maria Silva",
    status: "Em andamento",
    imagem: "/api/placeholder/400/250"
  },
  {
    id: 2,
    titulo: "Olimpíada de Matemática",
    descricao: "Preparação dos alunos para a OBMEP com aulas extras e simulados.",
    categoria: "Matemática",
    turma: "Fundamental II",
    responsavel: "Prof. João Santos",
    status: "Inscrições abertas",
    imagem: "/api/placeholder/400/250"
  },
  {
    id: 3,
    titulo: "Clube de Leitura",
    descricao: "Encontros semanais para discussão de livros e desenvolvimento do hábito da leitura.",
    categoria: "Literatura",
    turma: "Todos os anos",
    responsavel: "Prof. Ana Costa",
    status: "Ativo",
    imagem: "/api/placeholder/400/250"
  }
]

export default function Projetos() {
  return (
    <section id="projetos" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Projetos em Destaque
          </h2>
          <p className="text-xl text-gray-600">
            Conheça os projetos desenvolvidos por nossa comunidade escolar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projetos.map((projeto) => (
            <div key={projeto.id} className="card group">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-t-lg overflow-hidden">
                <div className="w-full h-48 bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-600 font-medium">Imagem do Projeto</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {projeto.categoria}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {projeto.status}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600">
                  {projeto.titulo}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {projeto.descricao}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{projeto.turma}</span>
                  <span>{projeto.responsavel}</span>
                </div>
                <button className="w-full mt-4 btn-primary text-sm">
                  Ver Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-secondary">
            Ver Todos os Projetos
          </button>
        </div>
      </div>
    </section>
  )
}
