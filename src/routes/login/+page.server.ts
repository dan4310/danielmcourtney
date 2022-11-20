import { ADMIN_PASS, ADMIN_USER } from '$env/static/private'
import { ADMIN_SESSION_NAME } from '$lib/config'
import { createAdminSession } from '$lib/server/auth'
import { invalid, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
	default: async ({ request, cookies, url }) => {
		const data = await request.formData()
		const username = String(data.get('username'))
		if (!username) return invalid(400, { message: 'Must provide username' })
		const password = String(data.get('password'))
		if (!password) return invalid(400, { message: 'Must provide password' })

		if (username !== ADMIN_USER) return invalid(400, { message: 'Username does not exist' })
		if (password !== ADMIN_PASS)
			return invalid(400, { message: 'Password does not match for that user' })

		cookies.set(ADMIN_SESSION_NAME, createAdminSession({ username, password }), {
			sameSite: true,
			secure: true,
			path: '/'
		})
		if (url.searchParams.has('redirectTo'))
			throw redirect(303, String(url.searchParams.get('redirectTo')))
		else throw redirect(303, '/admin')
	}
}
