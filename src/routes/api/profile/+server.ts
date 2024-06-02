/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from '$lib/lucia';
import { prisma } from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';

export async function POST({ request, locals }: { request: any; locals: any }): Promise<Response> {
	try {
		const { id }: { id: string } = await request.json();

		const profile = await prisma.profile.findMany({
			where: {
				user_id: id
			}
		});

		if (!profile) {
			return new Response(JSON.stringify({ error: 'Profile not found' }), {
				status: 404,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}

		return new Response(JSON.stringify({ profile }), {
			status: 302,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (err) {
		console.error(err);
		return new Response(JSON.stringify({ error: 'Couldnt change user information' }), {
			status: 404,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}