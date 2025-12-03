import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const loginUrl = new URL('https://www.tojoshop.com/auth', request.url);
    const homeUrl = new URL('https://www.tojoshop.com', request.url);

    // 1. Obtenemos el string crudo de TODAS las cookies que envía el navegador
    // (Aquí viene la HttpOnly 'token' encriptada y lista)
    const allCookies = request.headers.get('cookie');

    // Si el navegador no mandó cookies, ni intentamos.
    if (!allCookies) {
        return NextResponse.redirect(loginUrl);
    }

    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.tojoshop.com';

        // 2. Hacemos la petición a Laravel PASÁNDOLE LAS COOKIES
        // Esto es el equivalente en servidor a `credentials: 'include'`
        const apiRes = await fetch(`${apiUrl}/api/user`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Cookie': allCookies, // <--- ¡AQUÍ ESTÁ LA CLAVE! Pasamos la cookie intacta
                'Referer': request.url, // Ayuda a Sanctum a validar el origen
            },
        });

        // 3. Si Laravel dice que NO (401/403), es que la cookie no sirvió
        if (!apiRes.ok) {
            return NextResponse.redirect(loginUrl);
        }

        // 4. Si pasó, verificamos el rol
        const userData = await apiRes.json();
        const role = userData.role || userData.data?.role;

        if (role !== 'CEO' && role !== 'RH') {
            return NextResponse.redirect(homeUrl);
        }

        return NextResponse.next();

    } catch (error) {
        console.error('Middleware Error:', error);
        return NextResponse.redirect(loginUrl);
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)'],
};