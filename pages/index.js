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
          <Projetos />
          <Eventos />
          <PublicoAlvo />
          
          {/* Seção de Call to Action */}
          <section className="py-16 bg-primary-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Pronto para fazer parte da nossa comunidade?
              </h2>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Junte-se a centenas de alunos, professores e familiares que já estão usando nossa plataforma.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push('/register')}
                  className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
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