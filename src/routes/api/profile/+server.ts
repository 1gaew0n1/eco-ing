/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '$lib/prisma';
import genResponse from '$lib/type/response';

export async function POST({ request }: { request: any }): Promise<Response> {
	try {
		const { id }: { id: string } = await request.json();
		const profile = await prisma.profile.findUnique({
			where: {
				user_id: id
			}
		});
		console.log(profile?.id);

		if (!profile) {
			return genResponse(404, { error: '프로필을 찾지 못하였습니다.' });
		}

		return genResponse(302, { message: '프로필을 찾았습니다.', profile });
	} catch (err) {
		console.error(err);
		return genResponse(404, { message: '프로필을 가져오는 과정에서, 오류가 발생했습니다.', err });
	}
}
