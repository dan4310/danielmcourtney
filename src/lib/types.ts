export type Job = {
	id: number
	company: string
	position: string
	details: string[]
	location: string
	startDate: string
	endDate: string
}

export type Education = {
	id: number
	name: string
	degree: string
	description?: string
	startDate: string
	endDate: string
}

export type Project = {
	id: number
	slug: string
	title: string
	description: string
	tags: string
	image: string
	link?: string
	github?: string
}

export type Admin = {
	username: string
	password: string
}
