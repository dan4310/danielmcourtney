import Prisma, * as PrismaScope from '@prisma/client'
import { readFile } from './util'
import path from 'path'

const PrismaClient = Prisma?.PrismaClient || PrismaScope?.PrismaClient;
export const db = new PrismaClient();

export async function getProjectPost(project: PrismaScope.Project): Promise<string> {
	const file = await readFile(path.resolve('data/projects', project.slug + '.md'))
	return file.toString()
}
