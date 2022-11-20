<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
</script>

<div class="page">
	<main class="page__container-lg">
		<h1>Experience</h1>
		<section>
			<h2>Work Experience.</h2>
			{#each data.jobs as job (job.id)}
				<div class="job">
					<div class="job__header">
						<div>
							<h3>{job.company}</h3>
							<p class="job__position">{job.position?.toUpperCase()}</p>
						</div>
						<small class="job__dates">{job.location}</small>
					</div>
					<ul class="job__description">
						{#each job.details as detail}
							<li>{detail}</li>
						{/each}
					</ul>
					<div class="job__footer">
						<small class="job__dates"
							>{job.startDate} - {job.endDate ? job.endDate : 'Present'}</small
						>
					</div>
				</div>
				<hr />
			{/each}
		</section>
		<section>
			<h2>Education Experience.</h2>
			{#each data.educations as education (education.id)}
				<div class="job">
					<div class="job__header">
						<div>
							<h3>{education.name}</h3>
							<p class="job__position">{education.degree}</p>
						</div>
						<small class="job__dates"
							>{education.startDate} - {education.endDate ? education.endDate : 'Present'}</small
						>
					</div>
					<div class="job__description">
						<p>{education.description}</p>
					</div>
				</div>
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
	h3 {
		font-size: var.$font-size;
	}

	section {
		display: flex;
		flex-direction: column;
		gap: var.$padding;
		margin-top: var.$padding-md;
	}

	.job {
		display: flex;
		flex-direction: column;
		gap: var.$padding-sm;

		.job__header {
			display: flex;
			flex-direction: column;
			gap: var.$padding-xs;
			font-size: var.$font-size;
		}

		.job__position {
			font-weight: 900;
			color: var.$color-primary;
			font-size: var.$font-size-sm;
		}

		.job__description {
			font-size: var.$font-size-sm;
			display: flex;
			flex-direction: column;
			gap: var.$padding-xs;
			padding-left: var.$padding-md;
			li {
				display: list-item;
				list-style-type: circle;
			}
		}

		.job__dates {
			color: var.$theme-text-muted;
			font-size: var.$font-size-xs;
		}
	}
</style>
