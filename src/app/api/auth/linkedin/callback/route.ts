import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken } from '@/lib/linkedin';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
        return NextResponse.json({ error }, { status: 400 });
    }

    if (!code) {
        return NextResponse.json({ error: 'Missing code' }, { status: 400 });
    }

    try {
        const tokenData = await getAccessToken(code);

        // In a real application, you would create a session for the user here.
        // For this automation tool, we will return the token to the user 
        // or store it in a secure httpOnly cookie for subsequent requests.

        // Let's set it as a cookie for simplicity in this "automation" context
        const response = NextResponse.json({
            message: 'Authentication successful',
            access_token: tokenData.access_token,
            expires_in: tokenData.expires_in
        });

        response.cookies.set('linkedin_access_token', tokenData.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: tokenData.expires_in,
            path: '/',
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
