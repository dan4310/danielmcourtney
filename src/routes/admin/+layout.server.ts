import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals, url }) => {
	if (!locals.admin) {
		throw redirect(302, '/login?redirectTo=' + url.pathname)
	}
}
