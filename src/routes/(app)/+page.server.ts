import { Projects } from '$lib/server/jsondb'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const featuredProjects = await Projects.getAll()

	return {
		featuredProjects: featuredProjects.slice(0, 3)
	}
}
