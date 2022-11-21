import { GITHUB_USER } from './config'
import type { CommitResult } from './types'

const GITHUB_API = 'https://api.github.com/'

async function get<T>(path: string): Promise<T> {
	const res = await fetch(GITHUB_API + path)
	const data = await res.json()
	return data as T
}

export async function getCommits(repoName: string, page = 1, perPage = 5): Promise<CommitResult[]> {
	const data = await get<CommitResult[]>(
		`repos/${GITHUB_USER}/${repoName}/commits?page=${page}&per_page=${perPage}`
	)
	return data
}
