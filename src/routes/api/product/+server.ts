/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from '$lib/lucia';
import { prisma } from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';
import { v4 } from 'uuid';

export async function POST({ request, locals }: { request: any; locals: any }): Promise<Response> {
	try {
		const {
			id,
			name,
			imgURL,
			description,
			published,
			amount,
			price,
			secret
		}: {
			id: number;
			name: string;
			imgURL: string;
			description: string;
			published: boolean;
			amount: number;
			price: number;
			secret: string;
		} = await request.json();

		if (id === undefined) {
			if (secret !== 'waterwater') {
				return new Response(JSON.stringify({ error: 'Couldnt make' }), {
					status: 404,
					headers: {
						'Content-Type': 'application/json'
					}
				});
			}

			await prisma.product.create({
				data: {
					name,
					imgURL,
					description,
					published,
					amount,
					price
				}
			});

			return new Response(JSON.stringify({ message: 'Success', ok: true }), {
				status: 302,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		} else {
			const product = await prisma.product.findUnique({
				where: {
					id: id
				}
			});

			return new Response(JSON.stringify({ message: 'Success', ok: true, product }), {
				status: 302,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
	} catch (err) {
		console.error(err);
		return new Response(JSON.stringify({ error: 'Error' }), {
			status: 404,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}

let products: any;

export async function GET({ request, locals }: { request: any; locals: any }): Promise<Response> {
	try {
		products = await prisma.product.findMany();
	} catch (err) {
		console.error(err);
		return new Response(JSON.stringify({ error: 'Couldnt change user information' }), {
			status: 404,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
	return new Response(JSON.stringify({ products }), {
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
		const { id }: { id: number } = await request.json();
		await prisma.product.delete({
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
