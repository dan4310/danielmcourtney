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
