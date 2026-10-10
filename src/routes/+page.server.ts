import { requireAuth } from '$lib/server/auth';

export const load = ({ cookies, url }) => {
    requireAuth(cookies, url);
};
