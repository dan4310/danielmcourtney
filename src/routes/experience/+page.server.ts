import { Jobs, Educations } from '$lib/server/jsondb'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const jobs = await Jobs.getAll()
	const educations = await Educations.getAll()
	return {
		jobs,
		educations
	}
}
