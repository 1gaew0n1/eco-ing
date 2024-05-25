export async function getSession(request: any) {
	return {
		user: request.locals.user
	};
}
