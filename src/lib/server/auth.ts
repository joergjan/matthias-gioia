import { createHash } from 'node:crypto';

export const AUTH_COOKIE = 'mg_auth';
export const AUTH_TOKEN = createHash('sha256').update(`mg:${PASSWORD}`).digest('hex');

import { redirect, type Cookies } from '@sveltejs/kit';

export function requireAuth(cookies: Cookies, url: URL) {
    if (cookies.get(AUTH_COOKIE) !== AUTH_TOKEN) {
        redirect(303, `/login?redirect=${encodeURIComponent(url.pathname + url.search)}`);
    }
}
