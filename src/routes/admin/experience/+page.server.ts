import { Jobs } from '$lib/server/jsondb'
import { invalid } from '@sveltejs/kit'
import type { PageServerLoad, Actions } from './$types'

export const load: PageServerLoad = async () => {
    const jobs = await Jobs.getAll()
    return {
        jobs,
    }
}

export const actions: Actions = {
    createJob: async ({ request }) => {
        const data = await request.formData()
        const company = String(data.get('company'))
        if (!company) return invalid(400, { message: 'Must provide a company name' })
        const position = String(data.get('position'))
        if (!position) return invalid(400, { message: 'Must provide a position' })
        const details = String(data.get('details'))
        if (!details) return invalid(400, { message: 'Must provide details' })
        const location = String(data.get('location'))
        if (!location) return invalid(400, { message: 'Must provide a location' })
        const startDate = String(data.get('startDate'))
        if (!startDate) return invalid(400, { message: 'Must provide a startDate' })
        const endDate = String(data.get('endDate'))
        if (!endDate) return invalid(400, { message: 'Must provide a endDate' })

        try {
            const job = await Jobs.create({
                company,
                position,
                details,
                location,
                startDate,
                endDate
            })

            return { job }
        } catch (err) {
            console.log(err)
        }
    }
}