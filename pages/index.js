import Head from 'next/head'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Projetos from '@/components/sections/Projetos'
import Eventos from '@/components/sections/Eventos'
import PublicoAlvo from '@/components/sections/PublicoAlvo'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  // Verificar autenticação ao carregar
  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    
    if (token && user) {
      // Usuário já está logado
      console.log('Usuário autenticado:', JSON.parse(user))
    }
  }, [])

  return (
    <>
      <Head>
        <title>Escola Portal - Portal de Projetos e Eventos</title>
        <meta name="description" content="Centralize informações, projetos e eventos da escola em uma única plataforma digital acessível" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Hero />
          
          <section id="projetos">
            <Projetos />
          </section>
          
          <section id="eventos">
            <Eventos />
          </section>
        
          <section id="noticias" className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Últimas Notícias
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Fique por dentro das novidades e acontecimentos da nossa escola
                </p>
              </div>
              
              <div className="text-center py-8">
                <div className="inline-block p-8 bg-blue-50 rounded-lg">
                  <svg className="w-16 h-16 text-blue-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Página de Notícias em Desenvolvimento</h3>
                  <p className="text-gray-600 mb-4">
                    Em breve você poderá ver todas as notícias da escola aqui!
                  </p>
                  <button
                    onClick={() => router.push('/admin')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    (Admin pode criar notícias no painel)
                  </button>
                </div>
              </div>
            </div>
          </section>
          
          <PublicoAlvo />
          
          {/* Seção de Call to Action */}
          <section className="py-16 bg-blue-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Pronto para fazer parte da nossa comunidade?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Junte-se a centenas de alunos, professores e familiares que já estão usando nossa plataforma.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push('/register')}
                  className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
                >
                  Criar Minha Conta
                </button>
                <button
                  onClick={() => router.push('/login')}
                  className="border-2 border-white text-white hover:bg-white/10 font-medium py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
                >
                  Fazer Login
                </button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}