import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const loginUrl = new URL('https://www.tojoshop.com/auth', request.url);
    const homeUrl = new URL('https://www.tojoshop.com', request.url);

    // 1. AGARRAR EL PAQUETE CERRADO
    // No buscamos 'token'. Agarramos el header completo "Cookie" que envió el navegador.
    // Si el navegador lo envió, aquí está el string crudo.
    const rawCookieHeader = request.headers.get('cookie');

    // Si el navegador no envió NADA (ni siquiera el paquete cerrado), no podemos pasar.
    if (!rawCookieHeader) {
        console.log('⛔ Middleware: El navegador no envió headers de Cookie.');
        return NextResponse.redirect(loginUrl);
    }

    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.tojoshop.com';

        // 2. PASAR EL PAQUETE A LARAVEL
        // Inyectamos el header crudo en la petición al backend.
        const apiRes = await fetch(`${apiUrl}/api/user`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Cookie': rawCookieHeader, // <--- ¡Aquí va el pasamanos! Se va tal cual llegó.
                'Referer': request.url,     // Ayuda a que Sanctum no rechace la petición
            },
        });

        // 3. LARAVEL DECIDE (Él sí tiene la llave para abrir el paquete)
        if (!apiRes.ok) {
            console.log('❌ Middleware: Laravel rechazó la cookie (401).');
            return NextResponse.redirect(loginUrl);
        }

        // 4. VERIFICAR ROL (Solo si Laravel dio luz verde)
        const userData = await apiRes.json();
        // Ajusta esto según la estructura de tu API (puede ser userData.data.role)
        const role = userData.role || userData.data?.role;

        if (role !== 'CEO' && role !== 'RH') {
            console.log('⛔ Middleware: Rol incorrecto.');
            return NextResponse.redirect(homeUrl);
        }

        return NextResponse.next();

    } catch (error) {
        console.error('💥 Middleware Error:', error);
        return NextResponse.redirect(loginUrl);
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)'],
};