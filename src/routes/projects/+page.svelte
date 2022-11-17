<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData

	$: {
		console.log(data)
	}
</script>

<div class="page">
	<main class="page__container-lg">
		<h1>Projects</h1>

		{#each data.projects as project (project.id)}
			<p>{project.title}</p>
		{/each}
	</main>
</div>
