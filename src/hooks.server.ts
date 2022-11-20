import { ADMIN_SESSION_NAME } from '$lib/config'
import { verifyAdminSession } from '$lib/server/auth'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
    if (event.url.pathname.startsWith('/admin')) {
        const session = event.cookies.get(ADMIN_SESSION_NAME)
        if (session) {
            try {
                event.locals.admin = verifyAdminSession(session)
            } catch (err) {
                // invalid jwt
            }
        }
    }

    const response = await resolve(event)
    return response
}