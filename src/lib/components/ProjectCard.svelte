<script lang="ts">
	import type { Project } from '$lib/types'

	export let project: Project

	$: tagArr = project.tags.split('#')
	$: tags = tagArr.slice(1, tagArr.length)
</script>

<a href={`/projects/${project.slug}`}>
	<div class="card-img">
		<div class="card__header">
			<h3>{project.title}</h3>
			<p>{project.short}</p>
		</div>
		<div class="card__body">
			<img src={project.image} alt={project.title} />
		</div>
		<div class="card__footer">
			{#each tags as tag (tag)}
				<span>#{tag}</span>
			{/each}
		</div>
	</div>
</a>

<style lang="scss">
	@use '../../styles/variables' as var;

	.card__footer {
		display: flex;
		flex-wrap: wrap;
		gap: var.$padding-xs;
	}
</style>
