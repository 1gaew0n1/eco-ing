import { COOLSMS_API_KEY, COOLSMS_API_SECRET, PHONE_NUMBER } from '$env/static/private';
import genResponse from '$lib/type/response';
import axios from 'axios';
import CoolsmsMessageService from 'coolsms-node-sdk'; // 변경된 부분
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

// const coolsms = new CoolsmsMessageService(COOLSMS_API_KEY, COOLSMS_API_SECRET);

// 현재 모듈의 디렉토리 경로를 가져옵니다.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const POST = async ({ request }) => {
	const { to, text, where_to_use, due_date } = await request.json();
	if (!to || !text) {
		return new Response('Recipient number and text are required', { status: 400 });
	}

	const barcodeUrl = `https://eco-ing.vercel.app/api/barcode?text=${encodeURIComponent(text)}`;

	try {
		// 바코드 이미지 다운로드
		const barcodeResponse = await axios.get(barcodeUrl, { responseType: 'arraybuffer' });
		const barcodeBuffer = Buffer.from(barcodeResponse.data);

		// 이미지 변환
		const processedImageBuffer = await processBarcodeImage(barcodeBuffer);

		// 이미지 파일 경로 및 파일명 지정
		const imageDir = path.join(__dirname, '../../../images');
		const imagePath = path.join(imageDir, 'processedBarcode.jpg');

		// 디렉토리가 존재하지 않으면 생성
		if (!fs.existsSync(imageDir)) {
			fs.mkdirSync(imageDir, { recursive: true });
		}

		// 이미지 저장
		fs.writeFileSync(imagePath, processedImageBuffer);
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

		return genResponse(200, { message: '성공' });
	} catch (error) {
		console.error(error);
		return new Response('Error sending MMS', { status: 500 });
	}
};

async function processBarcodeImage(buffer) {
	// 이미지를 읽어들이고 sharp 모듈을 사용하여 처리
	const image = sharp(buffer);

	// 이미지를 RGBA 형식으로 변환
	const rgbaImage = await image.ensureAlpha().toBuffer();

	// 각 픽셀을 순회하면서 투명한 부분을 하얀색으로 채움
	const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
	for (let i = 0; i < data.length; i += 4) {
		// 투명한 픽셀의 경우 (알파 채널 값이 0)
		if (data[i + 3] === 0) {
			// RGB 값 변경 (흰색)
			data[i] = 255; // Red
			data[i + 1] = 255; // Green
			data[i + 2] = 255; // Blue
			data[i + 3] = 255; // Alpha
		}
	}

	// 변경된 데이터로 이미지 생성
	const modifiedImage = sharp(data, {
		raw: { width: info.width, height: info.height, channels: 4 }
	});

	// JPEG 형식으로 인코딩하여 반환
	return modifiedImage.jpeg().toBuffer();
}
