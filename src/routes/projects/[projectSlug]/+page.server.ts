import { Projects } from '$lib/server/jsondb'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
    const project = await Projects.getOne(params.projectSlug)
    if (!project) throw error(404, 'Project Not Found')
    return {
        project
    }
}