import { db } from '$lib/server/db'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const featuredProjects = await db.project.findMany({
		take: 3
	})

	return {
		featuredProjects: featuredProjects
	}
}
