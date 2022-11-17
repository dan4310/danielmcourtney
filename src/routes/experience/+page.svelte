<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData

	$: {
		console.log(data)
	}
</script>

<h1>Experience</h1>
<section>
	<h2>Work Experience.</h2>
	{#each data.jobs as job (job.id)}
		<p>{job.company}</p>
	{/each}
</section>
<section>
	<h2>Education Experience.</h2>
	{#each data.educations as education (education.id)}
		<p>{education.name}</p>
	{/each}
</section>
