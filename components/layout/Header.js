import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary-600">
                Escola Portal
              </h1>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8">
            <a href="#inicio" className="text-gray-700 hover:text-primary-600 font-medium">
              Início
            </a>
            <a href="#projetos" className="text-gray-700 hover:text-primary-600 font-medium">
              Projetos
            </a>
            <a href="#eventos" className="text-gray-700 hover:text-primary-600 font-medium">
              Eventos
            </a>
            <a href="#sobre" className="text-gray-700 hover:text-primary-600 font-medium">
              Sobre
            </a>
            <a href="#contato" className="text-gray-700 hover:text-primary-600 font-medium">
              Contato
            </a>
          </nav>

          {/* Login Button */}
          <div className="hidden md:block">
            <button className="btn-primary">
              Entrar
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600"
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
              <a href="#inicio" className="text-gray-700 hover:text-primary-600 font-medium">
                Início
              </a>
              <a href="#projetos" className="text-gray-700 hover:text-primary-600 font-medium">
                Projetos
              </a>
              <a href="#eventos" className="text-gray-700 hover:text-primary-600 font-medium">
                Eventos
              </a>
              <a href="#sobre" className="text-gray-700 hover:text-primary-600 font-medium">
                Sobre
              </a>
              <a href="#contato" className="text-gray-700 hover:text-primary-600 font-medium">
                Contato
              </a>
              <button className="btn-primary w-full">
                Entrar
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
