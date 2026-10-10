import { fail, redirect } from '@sveltejs/kit';
import { AUTH_COOKIE, AUTH_TOKEN } from '$lib/server/auth';
import { PASSWORD } from "$env/static/private"

export const actions = {
    default: async ({ request, cookies, url }) => {
        const formData = await request.formData();
        const password = String(formData.get('password') ?? '');

        if (password !== PASSWORD) {
            return fail(401, { message: 'Falsches Passwort.' });
        }

        cookies.set(AUTH_COOKIE, AUTH_TOKEN, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            secure: url.protocol === 'https:'
        });

        const target = url.searchParams.get('redirect') ?? '/';
        redirect(303, target.startsWith('/') && !target.startsWith('//') ? target : '/');
    }
};
