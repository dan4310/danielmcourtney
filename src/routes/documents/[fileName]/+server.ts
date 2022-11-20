import type { RequestHandler } from './$types'
import { readFile } from '$lib/server/util'

export const GET: RequestHandler = async ({ params }) => {
	const file = await readFile('data/documents/' + params.fileName)
	return new Response(file)
}
