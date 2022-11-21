<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
</script>

<div class="page">
	<main class="page__container-lg">
		<h1>Admin Experience</h1>
		<form method="POST" action="/?create">
			<input class="form-control" type="text" name="company" id="company" placeholder="Company" />
			<input
				class="form-control"
				type="text"
				name="position"
				id="position"
				placeholder="Position"
			/>
			<input
				class="form-control"
				type="text"
				name="location"
				id="location"
				placeholder="Location"
			/>
		</form>

		<section>
			<h2>Jobs</h2>
			<ul>
				{#each data.jobs as job}
					<li>{job.company}</li>
				{/each}
			</ul>
		</section>
	</main>
</div>

<style lang="scss">
	@use '../../../styles/variables' as var;
</style>
