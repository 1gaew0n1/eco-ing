import { auth } from './lucia';
import { prisma } from './prisma';
import { v4 } from 'uuid';

export async function register(
	name: string,
	username: string,
	password: string | null,
	studentsId: string,
	schoolName: string,
	barcode: string
) {
	try {
		await auth.createUser({
			key: {
				providerId: 'username',
				providerUserId: username,
				password
			},
			attributes: {
				name,
				username
			}
		});

		const key = await auth.useKey('username', username, password);

		await prisma.profile.create({
			data: {
				id: v4(),
				user_id: key.userId,
				studentsId,
				schoolName,
				class: studentsId.charAt(0) + '0' + studentsId.charAt(2),
				point: 0,
				level: 1,
				barcode: barcode
			}
		});
	} catch (error) {
		console.error(error);
	}
}

export async function getProfile(userId: any) {
	const profile = await prisma.profile.findUnique({
		where: {
			user_id: userId
		}
	});

	return profile;
}
