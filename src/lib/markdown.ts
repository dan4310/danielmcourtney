import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkGfm from 'remark-gfm'
import rehypeStringify from 'rehype-stringify'

type SuppliedData = {
	[key: string]: string | number | null | boolean
}

export async function converToHTML(markdown: string, data: SuppliedData = {}): Promise<string> {
	const file = await unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeStringify, { allowDangerousHtml: true })
		.process(searchAndReplace(markdown, data))

	return String(file)
}

function searchAndReplace(content: string, data: SuppliedData = {}): string {
	const keys = Object.keys(data)
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i]
		content = content.replaceAll('$' + key.toUpperCase(), String(data[key]))
	}
	return content
}
