import { About } from '$lib/server/jsondb'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
    const about = await About.get()

    return {
        about
    }
}