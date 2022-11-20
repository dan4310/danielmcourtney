<script lang="ts">
	import type { Project } from '$lib/types'

	export let project: Project

	$: tagArr = project.tags.split('#')
	$: tags = tagArr.slice(1, tagArr.length)
</script>

<div class="card project-root">
	{#if project.github || project.link}
		<div class="card__header">
			{#if project.github}
				<a href={project.github}>
					<i class="fa-brands fa-github" />
				</a>
			{/if}
			{#if project.link}
				<a href={project.link}>
					<i class="fa-solid fa-arrow-up-right-from-square" />
				</a>
			{/if}
		</div>
	{/if}
	<a class="card__main" href={`/projects/${project.slug}`}>
		<p class="card__title">{project.title}</p>
		<p class="card__body">{project.description}</p>
	</a>
	<div class="card__footer">
		{#each tags as tag (tag)}
			<span>#{tag}</span>
		{/each}
	</div>
</div>

<style lang="scss">
	@use '../../styles/variables' as var;
	@use '../../styles/mixins' as m;
	.project-root {
		width: 100%;
		@include m.focus(var.$color-primary);
		transition: box-shadow ease-in-out 0.15s, transform ease-in-out 0.15s;
		border-radius: var.$border-radius;

		&:hover {
			box-shadow: 3px 3px 6px rgba(black, 0.2);
			transform: translate(0, -0.5rem);
		}
	}
	.card {
		background-color: var.$theme-foreground;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: var.$padding-md;
		border-radius: var.$border-radius;
		padding: var.$padding;
		box-sizing: border-box;
		border: 1px solid transparent;

		.card__header {
			display: flex;
			justify-content: end;
			gap: var.$padding-md;

			a {
				font-size: 25px;
				transition: color ease-in-out 0.15s;
				&:hover {
					color: var.$color-primary;
				}
			}
		}
		.card__main {
			display: flex;
			flex-direction: column;
			gap: var.$padding-xs;
			&:hover {
				.card__title {
					text-decoration: underline;
				}
			}

			.card__title {
				font-size: var.$font-size;
				color: var.$color-primary;
				transition: text-decoration ease-in-out 0.15s;
			}
			.card__body {
				font-size: var.$font-size-sm;
			}
		}
		.card__footer {
			font-size: var.$font-size-sm;
			margin-top: auto;
			display: flex;
			gap: var.$padding-xs;
			color: var.$theme-text-muted;
			flex-wrap: wrap;
		}
	}
</style>
