import { db } from '$lib/server/db'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const jobs = await db.job.findMany()
	return {
		jobs
	}
}
