export type Job = {
	id: number
	company: string
	position: string
	details: string[]
	location: string
	startDate: string
	endDate: string
	image?: string
	link?: string
}

export type Education = {
	id: number
	name: string
	degree: string
	description?: string
	startDate: string
	endDate?: string
	image?: string
	link?: string
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

export type AboutData = {
	title: string
	subtitle: string
	description: string
	image: string
}

export type Admin = {
	username: string
	password: string
}

export type CommitResult = {
	sha: string
	node_id: string
	commit: Commit
	url: string
	html_url: string
	comments_url: string
}

export type Commit = {
	author: GithubUser
	committer: GithubUser
	message: string
}

export type GithubUser = {
	name: string
	email: string
	date: string
}
