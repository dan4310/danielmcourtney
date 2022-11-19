<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte'
	import type { PageData } from './$types'

	export let data: PageData
</script>

<div class="page">
	<main class="page__container-lg">
		<h1>Projects</h1>

		<div class="projects-container">
			{#each data.projects as project (project.id)}
				<ProjectCard {project} />
			{/each}
		</div>
	</main>
</div>

<style lang="scss">
	@use '../../styles/variables' as var;
	@use '../../styles/breakpoints' as b;

	.projects-container {
		margin-top: var.$padding;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var.$padding-md;
	}

	@include b.break(md) {
		.projects-container {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: space-between;
			align-items: start;
		}
	}
</style>
