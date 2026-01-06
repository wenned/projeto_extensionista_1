import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function Perfil() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    turma: '',
    matricula: ''
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token || !userData) {
      router.push('/login')
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setFormData({
        name: parsedUser.name,
        email: parsedUser.email,
        turma: parsedUser.turma || '',
        matricula: parsedUser.matricula || ''
      })
    } catch (error) {
      console.error('Erro ao carregar perfil:', error)
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }, [router])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/usuarios/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Erro ao atualizar perfil')
      }

      const updatedUser = await response.json()
      
      // Atualizar localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setUser(updatedUser)
      setEditMode(false)
      
      alert('Perfil atualizado com sucesso!')
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao atualizar perfil')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Cabeçalho do Perfil */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div className="ml-6">
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-blue-100">{user.email}</p>
                    <div className="flex items-center mt-2 space-x-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500 text-white">
                        {user.role === 'ADMIN' ? 'Administrador' : 
                         user.role === 'PROFESSOR' ? 'Professor' : 
                         user.role === 'COORDENADOR' ? 'Coordenador' : 
                         user.role === 'FUNCIONARIO' ? 'Funcionário' : 'Aluno'}
                      </span>
                      {user.turma && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-400 text-white">
                          {user.turma}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  {editMode ? 'Cancelar' : 'Editar Perfil'}
                </button>
              </div>
            </div>

            {/* Conteúdo do Perfil */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Informações Pessoais */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações Pessoais</h2>
                  
                  {editMode ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      {user.role === 'ALUNO' || user.role === 'PROFESSOR' ? (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Turma</label>
                          <input
                            type="text"
                            name="turma"
                            value={formData.turma}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ex: 3º Ano EM"
                          />
                        </div>
                      ) : null}
                      {user.role === 'ALUNO' ? (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Matrícula</label>
                          <input
                            type="text"
                            name="matricula"
                            value={formData.matricula}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Nome Completo</p>
                        <p className="font-medium text-gray-900">{user.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium text-gray-900">{user.email}</p>
                      </div>
                      {user.turma && (
                        <div>
                          <p className="text-sm text-gray-500">Turma/Série</p>
                          <p className="font-medium text-gray-900">{user.turma}</p>
                        </div>
                      )}
                      {user.matricula && (
                        <div>
                          <p className="text-sm text-gray-500">Matrícula</p>
                          <p className="font-medium text-gray-900">{user.matricula}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-gray-500">Data de Cadastro</p>
                        <p className="font-medium text-gray-900">
                          {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Estatísticas */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Minhas Atividades</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">0</div>
                      <p className="text-sm text-gray-600">Projetos Criados</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">0</div>
                      <p className="text-sm text-gray-600">Eventos Participando</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600">0</div>
                      <p className="text-sm text-gray-600">Projetos em Andamento</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-yellow-600">0</div>
                      <p className="text-sm text-gray-600">Conquistas</p>
                    </div>
                  </div>
                </div>

                {/* Últimas Atividades */}
                <div className="md:col-span-2 bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Últimas Atividades</h2>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>Você ainda não tem atividades recentes</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Participe de projetos e eventos para ver suas atividades aqui.
                    </p>
                  </div>
                </div>
              </div>

              {/* Botão Salvar (se estiver editando) */}
              {editMode && (
                <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                  >
                    Salvar Alterações
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}