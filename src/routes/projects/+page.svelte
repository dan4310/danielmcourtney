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
		gap: var.$padding-md;
	}

	@include b.break(md) {
		.projects-container {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
</style>
