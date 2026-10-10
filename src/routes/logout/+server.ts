import { AUTH_COOKIE } from '$lib/server/auth';

export const POST = ({ cookies }) => {
    cookies.delete(AUTH_COOKIE, { path: '/' });
    return new Response(null, { status: 204 });
};
