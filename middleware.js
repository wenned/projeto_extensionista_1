import { NextResponse } from 'next/server'
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export function middleware(request) {
  const token = request.cookies.get('token')?.value
  const url = request.nextUrl.pathname

  // Rotas que não precisam de autenticação
  const publicRoutes = ['/login', '/registro', '/']
  
  // Rotas de admin que precisam de role específica
  const adminRoutes = ['/admin', '/api/admin']
  
  // Se a rota é pública, permite acesso
  if (publicRoutes.some(route => url.startsWith(route))) {
    return NextResponse.next()
  }

  // Se não tem token, redireciona para login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const decoded = verify(token, JWT_SECRET)
    
    // Verifica se é admin para acessar rotas admin
    if (adminRoutes.some(route => url.startsWith(route)) && decoded.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Adiciona user ao request
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', decoded.userId)
    requestHeaders.set('x-user-role', decoded.role)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (error) {
    // Token inválido, redireciona para login
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/projetos/:path*',
    '/api/eventos/:path*',
    '/api/noticias/:path*',
  ],
}