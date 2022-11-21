<script lang="ts">
	import type { Education } from '@prisma/client'
	import moment from 'moment'

	export let education: Education
</script>

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
				{moment(education.startDate).format('MMMM YYYY')}
				-
				{education.endDate < new Date(Date.now())
					? moment(education.endDate).format('MMMM YYYY')
					: 'Present'}
			</small>
		</div>
	</div>
	<div class="job__description">
		<p>{education.description}</p>
	</div>
</div>

<style lang="scss">
	@use '../../styles/variables' as var;

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

		// .job__description {
		// 	font-size: var.$font-size-sm;
		// 	display: flex;
		// 	flex-direction: column;
		// 	gap: var.$padding-xs;
		// 	padding-left: var.$padding-md;
		// 	li {
		// 		display: list-item;
		// 		list-style-type: circle;
		// 	}
		// }

		.job__dates {
			color: var.$theme-text-muted;
			font-size: var.$font-size-xs;
		}
	}
</style>
