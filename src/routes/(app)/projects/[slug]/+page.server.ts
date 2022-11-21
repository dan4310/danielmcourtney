import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { converToHTML } from '$lib/markdown'
import { db, getProjectPost } from '$lib/server/db'

export const load: PageServerLoad = async ({ params }) => {
	const project = await db.project.findUnique({
		where: { slug: params.slug }
	})
	if (!project) throw error(404, 'Project Not Found')

	const markdown = await getProjectPost(project)
	if (!markdown) throw error(404, 'Post Not Found')

	return {
		project,
		content: await converToHTML(markdown, project)
	}
}
