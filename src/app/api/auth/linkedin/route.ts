import { redirect } from 'next/navigation';
import { getAuthorizationUrl } from '@/lib/linkedin';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
    const state = uuidv4();
    // In a real app, you should store the state in a cookie to verify it later.
    const url = getAuthorizationUrl(state);
    redirect(url);
}
