import { Projects } from '$lib/server/jsondb'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { converToHTML } from '$lib/markdown'

export const load: PageServerLoad = async ({ params }) => {
	const project = await Projects.getOneBySlug(params.slug)
	if (!project) throw error(404, 'Project Not Found')

	const markdown = await Projects.getPost(params.slug)
	if (!markdown) throw error(404, 'Post Not Found')

	return {
		project,
		content: await converToHTML(markdown, project)
	}
}
