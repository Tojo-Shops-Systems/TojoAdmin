import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {

    const loginUrl = new URL('/auth', request.url);
    const homeUrl = new URL('/', request.url);

    const rawCookieHeader = request.headers.get('cookie');

    if (!rawCookieHeader) {
        console.log('⛔ No se envió cookie al middleware');
        return NextResponse.redirect(loginUrl);
    }

    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.tojoshop.com';

        const apiRes = await fetch(`${apiUrl}/api/user`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Cookie': rawCookieHeader,
            },
        });

        if (!apiRes.ok) {
            console.log('❌ Laravel rechazó la cookie');
            return NextResponse.redirect(loginUrl);
        }

        const data = await apiRes.json();
        const role = data?.role || data?.data?.role;

        if (role !== 'CEO' && role !== 'RH') {
            console.log('⛔ Rol incorrecto');
            return NextResponse.redirect(homeUrl);
        }

        return NextResponse.next();

    } catch (error) {
        console.log('💥 Error middleware:', error);
        return NextResponse.redirect(loginUrl);
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
