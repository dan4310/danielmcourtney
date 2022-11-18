import type { Education, Job, Project } from '$lib/types'
import fs from 'fs'

export async function readJson<T>(path: string): Promise<T> {
	return new Promise((resolve, reject) => {
		fs.readFile(path, (err, jsonString) => {
			if (err) {
				return reject()
			}
			try {
				const data = JSON.parse(jsonString.toString()) as T
				resolve(data)
			} catch (err) {
				reject(err)
			}
		})
	})
}

type BaseEntity = {
	id: number
	slug?: string
}

class DBSet<T extends BaseEntity> {
	private _path: string
	private _cache: T[]

	constructor(path: string) {
		this._path = path
		this._cache = []
	}

	public async getAll(): Promise<T[]> {
		const data = await readJson<T[]>(this._path)
		this._cache = [...data]
		return data
	}

	public async getOne(id: number | string): Promise<T | null> {
		await this.checkCache()

		for (let i = 0; i < this._cache.length; i++) {
			switch (typeof id) {
				case 'number':
					if (this._cache[i].id === id) return this._cache[i]
					break
				case 'string':
					if (this._cache[i]?.slug === id) return this._cache[i]
					break;
			}
		}
		return null
	}

	private async checkCache() {
		if (this._cache.length === 0) await this.getAll()
	}
}

export const Jobs = new DBSet<Job>('data/jobs.json')
export const Educations = new DBSet<Education>('data/educations.json')
export const Projects = new DBSet<Project>('data/projects.json')
