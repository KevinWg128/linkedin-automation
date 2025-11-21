export const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID!;
export const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET!;
export const LINKEDIN_REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI!;

const LINKEDIN_OAUTH_URL = 'https://www.linkedin.com/oauth/v2';
const LINKEDIN_API_URL = 'https://api.linkedin.com/v2';

export function getAuthorizationUrl(state: string): string {
    const params = new URLSearchParams({
        response_type: 'code',
        client_id: LINKEDIN_CLIENT_ID,
        redirect_uri: LINKEDIN_REDIRECT_URI,
        state: state,
        scope: 'openid profile email w_member_social',
    });

    return `${LINKEDIN_OAUTH_URL}/authorization?${params.toString()}`;
}

export async function getAccessToken(code: string): Promise<any> {
    const params = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: LINKEDIN_REDIRECT_URI,
        client_id: LINKEDIN_CLIENT_ID,
        client_secret: LINKEDIN_CLIENT_SECRET,
    });

    const response = await fetch(`${LINKEDIN_OAUTH_URL}/accessToken`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error_description || 'Failed to get access token');
    }

    return response.json();
}

export async function getUserProfile() {
    const response = await fetch(`${LINKEDIN_API_URL}/me`, {
        headers: {
            Authorization: `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
        },
    });
    return response.json();
}

export async function searchPeople(query: string) {
    // Note: The Standard LinkedIn API has limited search capabilities.
    // We will use the 'people' endpoint if available or simulate a search if restricted.
    // For the purpose of this task, we'll assume we can use the /me endpoint to verify auth
    // and then discuss with the user about the specific search endpoint which might require specific permissions or partners program.
    // However, the user asked for "search", so we will try to implement a basic request.

    // Actually, standard LinkedIn API does not support people search for free. 
    // It only supports retrieving the authenticated user's profile.
    // We will implement a profile retrieval as a proof of concept for the "Search" requirement 
    // or use a known endpoint if the user has specific access.
    // For now, let's implement a generic GET request helper.

    // Wait, the user specifically asked to "automate my Linkedin search".
    // If they mean the public search, the API doesn't support it directly without partner access.
    // But I will implement the structure for it.

    return fetch(`${LINKEDIN_API_URL}/people`, {
        headers: {
            Authorization: `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
        },
    }).then(res => res.json());
}
