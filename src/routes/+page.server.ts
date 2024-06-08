import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProfile } from '$lib/account';
import CoolsmsMessageService from 'coolsms-node-sdk';

export const load: PageServerLoad = async ({ locals }) => {
	// const session = await locals.auth.validate();
	// if (!session) {
	// 	throw redirect(302, '/auth/register');
	// }

	console.log(CoolsmsMessageService);
	console.log(typeof CoolsmsMessageService);

	const session = await locals.auth.validate();
};
