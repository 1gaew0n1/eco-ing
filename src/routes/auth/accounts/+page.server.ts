import { auth } from '$lib/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const { username, name, email, studentsId, schoolName } = Object.fromEntries(
			await request.formData()
		) as Record<string, string>;
		try {
			const session = await locals.auth.validate();
			if (!session || !session.user) {
				console.log('No session or user found');
				console.log(session);
				throw redirect(302, '/');
			}
			await auth.updateUserAttributes(session.user.userId, {
				name,
				username,
				studentsId,
				schoolName,
				email,
				point: session.user.point,
				level: session.user.level
			});
		} catch (err) {
			console.error(err);
			return fail(400, { message: 'Could not change user config' });
		}
		throw redirect(302, '/');
	}
};
