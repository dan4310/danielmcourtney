export type Job = {
	id: number
	company: string
	position: string
	description: string
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
	title: string
	description: string
	tags: string
}
