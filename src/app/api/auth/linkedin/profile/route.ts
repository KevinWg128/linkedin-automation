import { NextRequest, NextResponse } from 'next/server';
import { getUserProfile } from '@/lib/linkedin';

export async function GET(request: NextRequest) {
    const profile = await getUserProfile();
    return NextResponse.json(profile);
}
