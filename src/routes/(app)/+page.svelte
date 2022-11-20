<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte'
	import type { PageData } from './$types'

	export let data: PageData
</script>

<main>
	<section class="hero">
		<div class="page">
			<div class="page__container-lg hero__header">
				<div class="hero__title">
					<p>SOFTWARE DEVELOPER</p>
					<h1>Creative solutions to technical problems.</h1>
				</div>
			</div>
		</div>
		<div class="page">
			<div class="page__container-xl hero__body">
				<img id="boxer" src="/images/boxer.svg" alt="boxer" />
				<img id="orator" src="/images/orator.svg" alt="orator" />
			</div>
		</div>
	</section>
	<div class="page">
		<div class="page__container-lg">
			<section class="projects">
				<div class="projects__header">
					<h2>Featured Projects</h2>
					<a href="/projects">View all projects.</a>
				</div>
				<div class="projects__container">
					{#each data.featuredProjects as project (project.id)}
						<ProjectCard {project} />
					{/each}
				</div>
			</section>
		</div>
	</div>
</main>

<style lang="scss">
	@use '../../styles/variables' as v;
	@use '../../styles/breakpoints' as b;

	.projects {
		padding-top: v.$padding-md;
		padding-bottom: v.$padding-md;
		display: flex;
		flex-direction: column;
		gap: v.$padding;
		.projects__header {
			display: flex;
			flex-direction: column;
			gap: v.$padding-xs;
			a {
				text-decoration: underline;
				transition: color ease-in-out 0.15s;
				font-size: v.$font-size-sm;
				&:hover {
					color: v.$color-primary;
				}
			}
		}
		.projects__container {
			display: flex;
			gap: v.$padding;
			flex-direction: column;
			align-items: center;
			@include b.break(md) {
				flex-direction: row;
				justify-content: space-between;
			}
		}
	}

	.hero__body {
		display: flex;
		justify-content: space-between;
		align-items: end;
	}

	.hero__title {
		width: 100%;
		@include b.break(md) {
			width: 66%;
		}
	}

	.hero__header {
		p {
			font-size: v.$font-size-sm;
			font-weight: 900;
			color: v.$color-primary;
			@include b.break(sm) {
				font-size: v.$font-size;
			}
		}
		h1 {
			font-size: v.$font-size-md;
			@include b.break(sm) {
				font-size: v.$font-size-lg;
			}
			@include b.break(md) {
				font-size: v.$font-size-xl;
			}
		}
	}
	$boxerH: 175px;
	$oratorH: $boxerH * 1.3;

	#boxer {
		height: $boxerH;
		@include b.break(sm) {
			height: $boxerH * 1.5;
		}
		@include b.break(md) {
			height: $boxerH * 2;
		}
	}

	#orator {
		height: $oratorH;
		@include b.break(sm) {
			height: $oratorH * 1.5;
		}
		@include b.break(md) {
			height: $oratorH * 2;
		}
	}
</style>
