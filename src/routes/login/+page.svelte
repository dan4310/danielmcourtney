<script lang="ts">
	import type { ActionData } from './$types'

	export let form: ActionData
</script>

<h1>Login</h1>
{#if form?.message}
	<p>{form.message}</p>
{/if}
<form method="POST">
	<input
		class="form-control"
		id="username"
		name="username"
		required
		type="text"
		placeholder="Username"
	/>
	<input
		class="form-control"
		id="password"
		name="password"
		required
		type="password"
		placeholder="Password"
	/>
	<button class="btn-primary" type="submit">Login</button>
</form>
