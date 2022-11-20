import fs from 'fs'

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

export async function readFile(path: string): Promise<Buffer> {
	return new Promise((resolve, reject) => {
		fs.readFile(path, (err, data) => {
			if (err) {
				return reject(err)
			}
			resolve(data)
		})
	})
}
