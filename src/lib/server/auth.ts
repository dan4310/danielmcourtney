import { ADMIN_JWT_KEY } from '$env/static/private'
import type { Admin } from '$lib/types'
import jwt from 'jsonwebtoken'

export function createAdminSession(admin: Admin): string {
	return jwt.sign(admin, ADMIN_JWT_KEY, {
		expiresIn: '24h'
	})
}

export function verifyAdminSession(session: string): Admin {
	return jwt.verify(session, ADMIN_JWT_KEY) as Admin
}
