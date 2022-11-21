<script lang="ts">
	import EducationCard from '$lib/components/EducationCard.svelte'
	import JobCard from '$lib/components/JobCard.svelte'
	import type { PageData } from './$types'

	export let data: PageData
</script>

<div class="page">
	<main class="page__container-lg">
		<h1>Experience</h1>
		<section>
			<h2>Work Experience.</h2>
			{#each data.jobs as job (job.id)}
				<JobCard {job} />
				<hr />
			{/each}
		</section>
		<section>
			<h2>Education Experience.</h2>
			{#each data.educations as education (education.id)}
				<EducationCard {education} />
			{/each}
		</section>
	</main>
</div>

<style lang="scss">
	@use '../../../styles/variables' as var;

	main {
		display: flex;
		flex-direction: column;
		gap: var.$padding-lg;
	}

	h1 {
		font-size: var.$font-size-lg;
	}
	h2 {
		font-size: var.$font-size-md;
	}
	section {
		display: flex;
		flex-direction: column;
		gap: var.$padding;
		margin-top: var.$padding-md;
	}
</style>
