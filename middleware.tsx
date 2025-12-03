import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    // 1. Intentar obtener la cookie segura
    // El navegador envía esto automáticamente si estás en el subdominio correcto
    const token = request.cookies.get('auth_token')?.value;

    // URL a donde mandaremos a los intrusos (la tienda pública)
    const publicHomeUrl = new URL('https://www.tojoshop.com', request.url);
    const publicLoginUrl = new URL('https://www.tojoshop.com/login', request.url);

    // 2. PRIMER FILTRO: ¿Tiene token?
    if (!token) {
        // Si no hay cookie, ni siquiera preguntamos a la API. ¡Fuera!
        return NextResponse.redirect(publicLoginUrl);
    }

    try {
        // 3. SEGUNDO FILTRO: ¿Es un token válido y de un Jefe?
        // Llamamos a tu Backend (Laravel) para que nos diga quién es el dueño del token
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://tojosystemgroup.tech';

        const apiRes = await fetch(`${apiUrl}/api/user`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        });

        if (!apiRes.ok) {
            // Si el token expiró o es falso, redirigir al login
            return NextResponse.redirect(publicLoginUrl);
        }

        const userData = await apiRes.json();
        const role = userData.role; // Asegúrate que tu API retorna este campo 'role' o similar

        // 4. TERCER FILTRO: Verificación de Rol
        // Si el usuario existe pero NO es CEO ni RH...
        if (role !== 'CEO' && role !== 'RH') {
            // Lo mandamos a la tienda principal, no tiene nada que hacer aquí
            return NextResponse.redirect(publicHomeUrl);
        }

        // 5. Si pasó todo, ¡Adelante!
        return NextResponse.next();

    } catch (error) {
        // Si la API está caída o falla algo, por seguridad bloqueamos
        console.error('Error en middleware de auth:', error);
        return NextResponse.redirect(publicLoginUrl);
    }
}

// Configuración: ¿A qué rutas aplica este cadenero?
export const config = {
    /*
     * Matcher: Aplica a TODAS las rutas, EXCEPTO:
     * - api (rutas internas de next)
     * - _next/static (imágenes, estilos, scripts)
     * - _next/image (optimizador de imágenes)
     * - favicon.ico
     * - public (archivos públicos)
     */
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
    ],
};
