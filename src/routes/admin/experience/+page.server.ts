import { Jobs } from '$lib/server/jsondb'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
    const jobs = await Jobs.getAll()
    return {
        jobs,
    }
}