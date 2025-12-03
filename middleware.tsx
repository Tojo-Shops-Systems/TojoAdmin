import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const loginUrl = new URL('https://www.tojoshop.com/auth', request.url);
    const homeUrl = new URL('https://www.tojoshop.com', request.url);

    // 1. Agarramos el header "Cookie" entero (el string crudo)
    // Aquí vienen todas las cookies (incluida la HttpOnly), encriptadas o como sean.
    const cookieHeader = request.headers.get('cookie');

    // Si el navegador no mandó nada, va para afuera.
    if (!cookieHeader) {
        return NextResponse.redirect(loginUrl);
    }

    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.tojoshop.com';

        // 2. Hacemos la petición a Laravel PASÁNDOLE EL HEADER DE COOKIES
        // Esto es el equivalente en servidor a poner { credentials: 'include' }
        const apiRes = await fetch(`${apiUrl}/api/user`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Cookie': cookieHeader, // <--- ¡AQUÍ ESTÁ LA CLAVE! Se van tal cual.
                'Referer': request.url, // Ayuda a Sanctum a validar el origen
            },
        });

        // 3. Si Laravel responde 401, es que la cookie no sirvió.
        if (!apiRes.ok) {
            return NextResponse.redirect(loginUrl);
        }

        // 4. Verificamos el rol (esto sí hay que leerlo de la respuesta de Laravel)
        const userData = await apiRes.json();
        const role = userData.role || userData.data?.role;

        if (role !== 'CEO' && role !== 'RH') {
            return NextResponse.redirect(homeUrl);
        }

        // Pasa
        return NextResponse.next();

    } catch (error) {
        console.error('Middleware Error:', error);
        return NextResponse.redirect(loginUrl);
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)'],
};