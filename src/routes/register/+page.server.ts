import { auth } from '$lib/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) {
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	default: async ({ request }) => {
		const { name, username, password, studentsId, schoolName } = Object.fromEntries(
			await request.formData()
		) as Record<string, string>;
		try {
			await auth.createUser({
				key: {
					providerId: 'username',
					providerUserId: username,
					password
				},
				attributes: {
					name,
					username,
					studentsId,
					point: 0,
					level: 1,
					schoolName
				}
			});
		} catch (err) {
			console.error(err);
			return fail(400, { message: 'Could not register user' });
		}
		throw redirect(302, '/login');
	}
};
