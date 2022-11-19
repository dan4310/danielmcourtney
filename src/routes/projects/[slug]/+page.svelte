<script lang="ts">
	import type { PageData } from './$types'
	import '$styles/components/_markdown.scss'
	export let data: PageData
</script>

<div class="page">
	<main class="page__container-lg">
		<div class="markdown">
			{@html data.content}
		</div>
	</main>
</div>
