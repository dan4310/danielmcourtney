import { PrismaClient, type Project } from '@prisma/client'
import { readFile } from './util'
import path from 'path'

export const db = new PrismaClient()

export async function getProjectPost(project: Project): Promise<string> {
	const file = await readFile(path.resolve('data/projects', project.slug + '.md'))
	return file.toString()
}
