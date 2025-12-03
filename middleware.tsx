import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const loginUrl = new URL('https://www.tojoshop.com/auth', request.url);
    const homeUrl = new URL('https://www.tojoshop.com', request.url);

    // 1. Obtenemos el string crudo de TODAS las cookies que envía el navegador
    // (Aquí viene la HttpOnly 'token' encriptada y lista)
    const response = await fetch(request.url, { credentials: 'include' });

    // Si el navegador no mandó cookies, ni intentamos.
    if (!response.ok) {
        return NextResponse.redirect(loginUrl);
    }

    try {
        const data = await response.json();
        const role = data.role;

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