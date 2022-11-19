import type { Education, Job, Project } from '$lib/types'
import fs from 'fs'
import path from 'path'

export async function readJson<T>(path: string): Promise<T> {
	return new Promise((resolve, reject) => {
		fs.readFile(path, (err, jsonString) => {
			if (err) {
				return reject(err)
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

export async function readFile(path: string): Promise<string> {
	return new Promise((resolve, reject) => {
		fs.readFile(path, (err, data) => {
			if (err) {
				return reject(err)
			}
			resolve(data.toString())
		})
	})
}

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
		await this.checkCahe()

		for (let i = 0; i < this._cache.length; i++) {
			if (this._cache[i].id === id) return this._cache[i]
		}
		return null
	}

	protected async checkCahe() {
		if (this._cache.length === 0) await this.getAll()
	}
}

interface BasePostEntity extends BaseEntity {
	slug: string
}

class DBPostsSet<T extends BasePostEntity> extends DBSet<T> {
	public async getOneBySlug(slug: string): Promise<T | null> {
		await this.checkCahe()
		for (let i = 0; i < this._cache.length; i++) {
			if (this._cache[i].slug === slug) return this._cache[i]
		}
		return null
	}

	public async getPost(slug: string): Promise<string | null> {
		await this.checkCahe()
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

export const Jobs = new DBSet<Job>('jobs')
export const Educations = new DBSet<Education>('educations')
export const Projects = new DBPostsSet<Project>('projects')
