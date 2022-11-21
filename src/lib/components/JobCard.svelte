<script lang="ts">
	import type { Job } from "$lib/types"


    export let job: Job
    $: detailsArr = job.details?.split('#')
    $: details = detailsArr.slice(1, detailsArr.length)
</script>

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
        {#each details as detail}
            <li>{detail}</li>
        {/each}
    </ul>
    <div class="job__footer">
        <small class="job__dates"
            >{job.startDate} - {job.endDate ? job.endDate : 'Present'}</small
        >
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