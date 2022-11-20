<script lang="ts">
	import { page } from '$app/stores'
</script>

<div class="page">
	<main class="page__container-lg">
		<h1>{$page.status}: {$page.error?.message}</h1>
	</main>
</div>

<style>
	main {
		justify-content: center;
		display: flex;
	}
</style>
