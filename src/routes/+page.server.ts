import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProfile } from '$lib/account';

export const load: PageServerLoad = async ({ locals }) => {
	// const session = await locals.auth.validate();
	// if (!session) {
	// 	throw redirect(302, '/auth/register');
	// }

	const session = await locals.auth.validate();
};
