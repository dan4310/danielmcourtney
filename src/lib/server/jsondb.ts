import type { AboutData, Education, Job, Project } from '$lib/types'
import path from 'path'
import { readJson, readFile, writeJson } from '$lib/server/util'

interface BaseEntity {
	id: number
}

class DBSet<T extends BaseEntity> {
	protected static basePath = 'data'
	protected _pathToJson: string
	protected _name: string
	protected _cache: T[]

	constructor(name: string) {
		this._name = name
		this._pathToJson = path.resolve(DBSet.basePath, name + '.json')
		this._cache = []
	}

	public async getAll(): Promise<T[]> {
		const data = await readJson<T[]>(this._pathToJson)
		this._cache = [...data]
		return data
	}

	public async getOne(id: number): Promise<T | null> {
		await this.checkCache()

		for (let i = 0; i < this._cache.length; i++) {
			if (this._cache[i].id === id) return this._cache[i]
		}
		return null
	}

	public async create(partial: Partial<T>): Promise<T> {
		await this.checkCache()
		let maxId = 0
		for (let i = 0; i < this._cache.length; i++) {
			if (this._cache[i].id > maxId) maxId = this._cache[i].id
		}
		const newItem = { ...partial, id: maxId + 1 } as T
		this._cache.push(newItem)
		writeJson(this._pathToJson, this._cache)
		return newItem
	}

	protected async checkCache() {
		if (this._cache.length === 0) await this.getAll()
	}
}

interface BasePostEntity extends BaseEntity {
	slug: string
}

class DBPostsSet<T extends BasePostEntity> extends DBSet<T> {
	public async getOneBySlug(slug: string): Promise<T | null> {
		await this.checkCache()
		for (let i = 0; i < this._cache.length; i++) {
			if (this._cache[i].slug === slug) return this._cache[i]
		}
		return null
	}

	public async getPost(slug: string): Promise<string | null> {
		await this.checkCache()
		for (let i = 0; i < this._cache.length; i++) {
			if (this._cache[i].slug === slug) {
				try {
					const data = await readFile(path.resolve(DBSet.basePath, this._name, slug + '.md'))
					return data.toString()
				} catch (err) {
					return null
				}
			}
		}
		return null
	}
}

class DBItem<T> {
	protected static basePath = 'data'
	protected _pathToJson: string

	constructor(name: string) {
		this._pathToJson = path.resolve(DBItem.basePath, name + '.json')
	}

	public async get(): Promise<T> {
		console.log(this._pathToJson)
		return await readJson<T>(this._pathToJson)
	}
}

export const Jobs = new DBSet<Job>('jobs')
export const Educations = new DBSet<Education>('educations')
export const Projects = new DBPostsSet<Project>('projects')
export const About = new DBItem<AboutData>('about')
