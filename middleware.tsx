import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const publicLoginUrl = new URL('https://www.tojoshop.com/auth', request.url);

    // --- LOG DE DIAGNÓSTICO ---
    console.log('------------------------------------------------');
    console.log('🔒 Middleware ejecutándose en:', request.url);
    console.log('🍪 Cookie "token":', token ? 'ENCONTRADA (Oculta por seguridad)' : 'NO ENCONTRADA / NULL');

    // 1. CHEQUEO DE COOKIE
    if (!token) {
        console.log('❌ RECHAZADO: No se encontró la cookie. Redirigiendo a login.');
        return NextResponse.redirect(publicLoginUrl);
    }

    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.tojoshop.com';
        console.log('📡 Conectando a API Laravel:', `${apiUrl}/api/user`);

        const apiRes = await fetch(`${apiUrl}/api/user`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        });

        console.log('📡 Estado respuesta API:', apiRes.status);

        if (!apiRes.ok) {
            const errorText = await apiRes.text();
            console.log('❌ RECHAZADO: API devolvió error:', errorText);
            return NextResponse.redirect(publicLoginUrl);
        }

        const userData = await apiRes.json();
        const role = userData.role || userData.data?.role; // Ajusta según tu respuesta real
        console.log('👤 Usuario:', userData.email, '| Rol:', role);

        if (role !== 'CEO' && role !== 'RH') {
            console.log('⛔ RECHAZADO: Rol insuficiente.');
            return NextResponse.redirect(new URL('https://www.tojoshop.com', request.url));
        }

        console.log('✅ APROBADO: Acceso concedido.');
        return NextResponse.next();

    } catch (error) {
        console.error('💥 ERROR CRÍTICO:', error);
        return NextResponse.redirect(publicLoginUrl);
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)'],
};