import { COOLSMS_API_KEY, COOLSMS_API_SECRET, PHONE_NUMBER } from '$env/static/private';
import genResponse from '$lib/type/response';
import CoolsmsMessageService from 'coolsms-node-sdk';

// 현재 모듈의 디렉토리 경로를 가져옵니다.
// const coolsms = new CoolsmsMessageService(COOLSMS_API_KEY, COOLSMS_API_SECRET);
export const POST = async ({ request }) => {
	const { to, text, where_to_use, due_date } = await request.json();
	if (!to || !text || !where_to_use || !due_date) {
		return new Response('Recipient number and text are required', { status: 400 });
	}

	const barcodeUrl = `https://bwipjs-api.metafloor.com/?bcid=code128&text=${text}&scale=3&height=10&includetext=true&textalign=center&padding=5`;

	try {
		return genResponse(200, {
			imagePath: barcodeUrl,
			CoolsmsMessageService,
			type: typeof CoolsmsMessageService
		});
		// const response = await coolsms
		// 	.uploadFile(imagePath, 'MMS')
		// 	.then((res: any) => res.fileId)
		// 	.then((fileId: any) => {
		// 		coolsms.sendOne({
		// 			imageId: fileId,
		// 			to: to,
		// 			from: PHONE_NUMBER,
		// 			text: `구매처리가 완료되었습니다. 전국 ${where_to_use} 에서 ${due_date} 이전 까지 사용 가능한 상품권입니다. `,
		// 			subject: '구매 처리 완료',
		// 			autoTypeDetect: true
		// 		});
		// 	});

		// return genResponse(200, { message: '성공' });
	} catch (err) {
		console.error(err);
		return genResponse(404, { error: '오류가 발생했습니다', err });
	}
};
