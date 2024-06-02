import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/prisma';
import { COOLSMS_API_KEY, COOLSMS_API_SECRET, PHONE_NUMBER } from '$env/static/private';
import msgModule from 'coolsms-node-sdk';

export const load: PageServerLoad = async ({ locals }) => {
	try {
		const session = await locals.auth.validate();
		if (session) {
			throw redirect(302, '/');
		}
	} catch (error) {
		console.error(error);
	}
};

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		const pid = params.productId;
		const session = await locals.auth.validate();
		const { phone } = Object.fromEntries(await request.formData()) as Record<string, string>;
		try {
			const product = await prisma.product.findUnique({
				where: {
					id: Number(pid)
				}
			});
			const product_key = await prisma.product_key.findFirst({
				where: {
					productId: Number(pid)
				}
			});
			const user = await prisma.profile.findUnique({
				where: {
					user_id: session.user.userId
				}
			});
			if (!user) {
				throw Error("Could'nt find USER");
			}
			if (!product) {
				throw Error("Could'nt find PRODUCT");
			}
			await prisma.profile.update({
				where: {
					user_id: session.user.userId
				},
				data: {
					point: user?.point - product?.price
				}
			});
			const product_d = await prisma.product.findUnique({
				where: {
					id: Number(pid)
				}
			});
			if (!product_d) {
				return new Response(JSON.stringify({ error: 'Error' }), {
					status: 404,
					headers: {
						'Content-Type': 'application/json'
					}
				});
			}
			await prisma.product.update({
				where: {
					id: Number(pid)
				},
				data: {
					amount: product_d?.amount - 1
				}
			});
			const key = product_key?.keys;
			// const messageService = new msgModule(COOLSMS_API_KEY, COOLSMS_API_SECRET);
			// const message = {
			// 	text: '구매처리 완료!' + key + '입니다.',
			// 	to: phone,
			// 	from: PHONE_NUMBER,
			// 	autoTypeDetect: true
			// };
			// await messageService.sendOne(message).then(console.log).catch(console.error);
			await prisma.product_key.delete({
				where: {
					id: product_key?.id
				}
			});
		} catch (err) {
			console.error(err);
			return fail(400, { message: 'Could not login user.' });
		}
		throw redirect(302, '/');
	}
};
