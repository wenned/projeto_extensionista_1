import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error('Erro ao parsear usuário:', error)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    router.push('/')
  }

 
  const scrollToSection = (sectionId) => {
    if (router.pathname !== '/') {

      router.push('/').then(() => {

        setTimeout(() => {
          const element = document.getElementById(sectionId)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      })
    } else {

      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
                Escola Portal
              </h1>
            </Link>
          </div>


          <nav className="hidden md:flex space-x-8">
            <Link href="/" className={`font-medium ${router.pathname === '/' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              Início
            </Link>
            <button
              onClick={() => scrollToSection('projetos')}
              className={`font-medium ${router.pathname === '/' ? 'text-gray-700 hover:text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Projetos
            </button>
            <button
              onClick={() => scrollToSection('eventos')}
              className={`font-medium ${router.pathname === '/' ? 'text-gray-700 hover:text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Eventos
            </button>
            <button
              onClick={() => scrollToSection('noticias')}
              className={`font-medium ${router.pathname === '/' ? 'text-gray-700 hover:text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Notícias
            </button>
            {user?.role === 'ADMIN' && (
              <Link href="/admin" className="font-medium text-red-600 hover:text-red-700">
                Admin
              </Link>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-700">
                  <span className="font-semibold">{user.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Link 
                    href="/perfil" 
                    className="text-sm text-gray-600 hover:text-blue-600 font-medium px-3 py-1 rounded hover:bg-gray-100 transition-colors"
                  >
                    Perfil
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link 
                    href="/meus-projetos" 
                    className="text-sm text-gray-600 hover:text-blue-600 font-medium px-3 py-1 rounded hover:bg-gray-100 transition-colors"
                  >
                    Meus Projetos
                  </Link>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-red-600 hover:text-red-800 font-medium px-3 py-1 rounded hover:bg-red-50 transition-colors"
                  >
                    Sair
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                  Entrar
                </Link>
                <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                  Cadastrar
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            {user ? (
              <div className="text-sm text-gray-700">
                Olá, {user.name.split(' ')[0]}
              </div>
            ) : (
              <Link href="/login" className="text-gray-700 hover:text-blue-600">
                Entrar
              </Link>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className={`font-medium ${router.pathname === '/' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <button
                onClick={() => {
                  scrollToSection('projetos')
                  setIsMenuOpen(false)
                }}
                className="text-left font-medium text-gray-700 hover:text-blue-600"
              >
                Projetos
              </button>
              <button
                onClick={() => {
                  scrollToSection('eventos')
                  setIsMenuOpen(false)
                }}
                className="text-left font-medium text-gray-700 hover:text-blue-600"
              >
                Eventos
              </button>
              <button
                onClick={() => {
                  scrollToSection('noticias')
                  setIsMenuOpen(false)
                }}
                className="text-left font-medium text-gray-700 hover:text-blue-600"
              >
                Notícias
              </button>
              
              {user ? (
                <>
                  <div className="pt-2 border-t">
                    <Link 
                      href="/perfil" 
                      className="font-medium text-gray-700 hover:text-blue-600 block py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Meu Perfil
                    </Link>
                    <Link 
                      href="/meus-projetos" 
                      className="font-medium text-gray-700 hover:text-blue-600 block py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Meus Projetos
                    </Link>
                    {user.role === 'ADMIN' && (
                      <Link 
                        href="/admin" 
                        className="font-medium text-red-600 hover:text-red-700 block py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Painel Admin
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      className="text-left font-medium text-red-600 hover:text-red-700 block py-2 w-full"
                    >
                      Sair
                    </button>
                  </div>
                </>
              ) : (
                <Link 
                  href="/register" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cadastrar
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}