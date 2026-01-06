import { useRouter } from 'next/router'

export default function Hero() {
  const router = useRouter()

  return (
    <section className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white overflow-hidden">

      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Bem-vindo ao Portal da
            <span className="block text-primary-200">Comunidade Escolar</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
            Centralize informações, compartilhe projetos e participe dos eventos da nossa escola em uma única plataforma digital.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push('/projetos')}
              className="btn-secondary bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            >
              Explorar Projetos
            </button>
            <button 
              onClick={() => router.push('/eventos')}
              className="btn-primary bg-primary-500 hover:bg-primary-600 border border-white px-8 py-3 text-lg font-semibold"
            >
              Ver Eventos
            </button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
            <div className="text-3xl font-bold">50+</div>
            <div className="text-primary-200">Projetos Ativos</div>
          </div>
          <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
            <div className="text-3xl font-bold">200+</div>
            <div className="text-primary-200">Eventos Realizados</div>
          </div>
          <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
            <div className="text-3xl font-bold">1000+</div>
            <div className="text-primary-200">Usuários</div>
          </div>
          <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
            <div className="text-3xl font-bold">24/7</div>
            <div className="text-primary-200">Acesso Online</div>
          </div>
        </div>
      </div>
    </section>
  )
}