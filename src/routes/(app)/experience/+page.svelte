<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
	$: educations = data.educations.sort((a, b) => {
		const A = new Date(a.startDate)
		const B = new Date(b.startDate)
		if (B > A) return 1
		else if (A < B) return -1
		else return 0	
	})

	$: jobs = data.jobs.sort((a, b) => {
		const A = new Date(a.startDate)
		const B = new Date(b.startDate)
		if (B > A) return 1
		else if (A < B) return -1
		else return 0	
	})
</script>

<div class="page">
	<main class="page__container-lg">
		<h1>Experience</h1>
		<section>
			<h2>Work Experience.</h2>
			{#each jobs as job (job.id)}
				<div class="job">
					<div class="job__header">
						{#if job.image}
							<div class="job__image">
								<img src={job.image} alt={job.company} loading="lazy" />
							</div>
						{/if}
							<div class="job__title">
								<div>
									{#if job.link}
										<a href={job.link} style="display: contents;">
											<h3>{job.company}</h3>
										</a>
									{:else}
										<h3>{job.company}</h3>
									{/if}
									<p class="job__position">{job.position?.toUpperCase()}</p>
								</div>
								<small class="job__dates">{job.location}</small>
							</div>
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
			{#each educations as education (education.id)}
				<div class="job">
					<div class="job__header">
						{#if education.image}
							<div class="job__image">
								<img src={education.image} alt={education.name} loading="lazy" />
							</div>
						{/if}
						<div class="job__title">
							<div>
								{#if education.link}
									<a href={education.link} style="display: contents;">
										<h3>{education.name}</h3>
									</a>
								{:else}
									<h3>{education.name}</h3>
								{/if}
								<p class="job__position">{education.degree}</p>
							</div>
							<small class="job__dates">
								{education.startDate} - {education.endDate ? education.endDate : 'Present'}
							</small>
						</div>
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
			gap: var.$padding-sm;
			
			
			
		}

		.job__image > img {
			width: 60px;
			border-radius: var.$border-radius;
		}

		.job__title {
			display: flex;
			flex-direction: column;
			gap: var.$padding-xs;
			font-size: var.$font-size;
			h3 {
				transition: color ease-in-out 0.1s;
			}
			a:hover {
				h3 {
					text-decoration: underline;
				}
			}
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
