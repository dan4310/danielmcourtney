import type { AboutData } from '$lib/types'
import path from 'path'
import { readJson } from '$lib/server/util'

class DBItem<T> {
	protected static basePath = 'data'
	protected _pathToJson: string

	constructor(name: string) {
		this._pathToJson = path.resolve(DBItem.basePath, name + '.json')
	}

	public async get(): Promise<T> {
		return await readJson<T>(this._pathToJson)
	}
}

export const About = new DBItem<AboutData>('about')
