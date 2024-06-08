import type { RequestHandler } from './$types';
import bwipjs from 'bwip-js';

export const GET: RequestHandler = async ({ url }) => {
	const text = url.searchParams.get('text');
	if (!text) {
		return new Response('Text query parameter is required', { status: 400 });
	}

	try {
		const png = await bwipjs.toBuffer({
			bcid: 'code128', // 바코드 형식
			text: text, // 바코드에 포함할 텍스트
			scale: 3, // 크기 조절
			height: 10, // 높이
			includetext: true, // 텍스트 포함 여부
			textxalign: 'center', // 텍스트 정렬
			padding: 5
		});

		return new Response(png, {
			headers: { 'Content-Type': 'image/png' }
		});
	} catch (error) {
		console.error('Error generating barcode:', error);
		return new Response('Error generating barcode', { status: 500 });
	}
};
