export default function Hero() {
  return (
    <section id="inicio" className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bem-vindo ao Portal da Escola
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-50">
            Centralizando informações, projetos e eventos da nossa comunidade escolar
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#projetos" className="btn-secondary bg-white text-primary-600 hover:bg-gray-100">
              Explorar Projetos
            </a>
            <a href="#eventos" className="btn-primary bg-primary-500 hover:bg-primary-600 border border-white">
              Ver Eventos
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
