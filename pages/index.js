import Head from 'next/head'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import Projetos from '../components/sections/Projetos'
import Eventos from '../components/sections/Eventos'
import PublicoAlvo from '../components/sections/PublicoAlvo'

export default function Home() {
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
        </main>
        <Footer />
      </div>
    </>
  )
}
