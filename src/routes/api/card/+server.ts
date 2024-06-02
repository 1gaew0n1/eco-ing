/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from '$lib/lucia';
import { prisma } from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';
import { v4 } from 'uuid';

export async function POST({ request, locals }: { request: any; locals: any }): Promise<Response> {
	try {
		const {
			title,
			imgURL,
			style,
			url,
			secret,
			description
		}: {
			title: string;
			imgURL: string;
			style: string;
			url: string;
			secret: string;
			description: string;
		} = await request.json();

		if (secret !== 'waterwater') {
			return new Response(JSON.stringify({ error: 'Couldnt make' }), {
				status: 404,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}

		if (title.length > 11) {
			return new Response(JSON.stringify({ error: 'Title is too long' }), {
				status: 404,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}

		await prisma.card.create({
			data: {
				id: v4(),
				title,
				imgURL,
				style,
				url,
				description
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
	return new Response(JSON.stringify({ message: 'Success', ok: true }), {
		status: 302,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

let cards: any;

export async function GET({ request, locals }: { request: any; locals: any }): Promise<Response> {
	try {
		cards = await prisma.card.findMany();
	} catch (err) {
		console.error(err);
		return new Response(JSON.stringify({ error: 'Couldnt change user information' }), {
			status: 404,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
	return new Response(JSON.stringify({ cards }), {
		status: 302,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

export async function DELETE({
	request,
	locals
}: {
	request: any;
	locals: any;
}): Promise<Response> {
	try {
		const { id }: { id: string } = await request.json();
		await prisma.card.delete({
			where: {
				id: id
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
	return new Response(JSON.stringify({ message: 'success' }), {
		status: 302,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
