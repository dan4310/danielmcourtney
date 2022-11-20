import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

export async function converToHTML(markdown: string): Promise<string> {
	const file = await unified()
		.use(remarkParse)
		.use(remarkRehype, {allowDangerousHtml: true})
		.use(rehypeStringify, {allowDangerousHtml: true})
		.process(markdown)

	return String(file)
}