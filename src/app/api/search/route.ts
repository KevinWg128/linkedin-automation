import { NextRequest, NextResponse } from 'next/server';
import { searchPeople } from '@/lib/linkedin';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    // Get token from cookie
    const accessToken = request.cookies.get('linkedin_access_token')?.value;

    if (!accessToken) {
        return NextResponse.json({ error: 'Unauthorized. Please log in first.' }, { status: 401 });
    }

    if (!query) {
        return NextResponse.json({ error: 'Missing query parameter "q"' }, { status: 400 });
    }

    try {
        const results = await searchPeople(accessToken, query);
        return NextResponse.json(results);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
