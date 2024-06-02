/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from '$lib/lucia';
import { prisma } from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';
import { v4 } from 'uuid';

let product_key: any;

export async function POST({ request, locals }: { request: any; locals: any }): Promise<Response> {
	try {
		const {
			keys,
			productId
		}: {
			keys: string;
			productId: number;
		} = await request.json();

		if (keys === undefined) {
			product_key = await prisma.product_key.findFirst({
				where: {
					productId
				}
			});

			return new Response(JSON.stringify({ product_key }), {
				status: 302,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		} else {
			await prisma.product_key.create({
				data: {
					id: v4(),
					keys,
					productId
				}
			});

			const product = await prisma.product.findUnique({
				where: {
					id: productId
				}
			});
			if (!product) {
				return new Response(JSON.stringify({ error: 'Error' }), {
					status: 404,
					headers: {
						'Content-Type': 'application/json'
					}
				});
			}
			await prisma.product.update({
				where: {
					id: productId
				},
				data: {
					amount: product?.amount + 1
				}
			});

			return new Response(JSON.stringify({ message: 'Success', ok: true }), {
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

export async function DELETE({
	request,
	locals
}: {
	request: any;
	locals: any;
}): Promise<Response> {
	try {
		const { id }: { id: string } = await request.json();
		const productpre = await prisma.product_key.findUnique({
			where: {
				id
			}
		});
		if (!productpre) {
			return new Response(JSON.stringify({ error: 'Error' }), {
				status: 404,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
		const productId = productpre.productId;
		await prisma.product_key.delete({
			where: {
				id: id
			}
		});

		const product = await prisma.product.findUnique({
			where: {
				id: productId
			}
		});
		if (!product) {
			return new Response(JSON.stringify({ error: 'Error' }), {
				status: 404,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
		await prisma.product.update({
			where: {
				id: productId
			},
			data: {
				amount: product?.amount - 1
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
