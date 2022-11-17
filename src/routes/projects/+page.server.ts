import { Projects } from '$lib/server/jsondb'
import type { PageSeverLoad } from './$types'

export const load: PageServerLoad = async () => {
	const projects = await Projects.getAll()
	return {
		projects
	}
}
