<script lang="ts">
	import { DialogOverlay, Dialog, DialogTitle } from '@rgossiaux/svelte-headlessui'
	import { createEventDispatcher } from 'svelte'
	import { fly, fade } from 'svelte/transition'

	export let open = false
	const dispatch = createEventDispatcher()
</script>

<Dialog {open} on:close={() => dispatch('close')}>
	<div
		class="container"
		transition:fade={{
			duration: 150
		}}
	>
		<DialogOverlay class="overlay" />

		<aside
			class="drawer"
			transition:fly={{
				x: 325,
				duration: 150
			}}
		>
			<DialogTitle>
				<div class="drawer__header">
					<button type="button" class="btn-round" on:click={() => dispatch('close')}>
						<i class="fa fa-x" />
					</button>
				</div>
			</DialogTitle>
			<div class="drawer__content">
				<slot />
			</div>
		</aside>
	</div>
</Dialog>

<style lang="scss">
	@use '../../styles/variables' as var;

	.container {
		position: fixed;
		top: 0;
		display: flex;
		width: 100%;
		height: 100%;
		background-color: rgba(black, 0.5);
	}

	.drawer {
		width: 100%;
		max-width: 325px;
		flex: 2;
		background-color: var.$theme-background;
		.drawer__header {
			display: flex;
			justify-content: end;
			padding: var.$padding-sm;
		}
	}

	:global(.overlay) {
		flex: 1;
	}
</style>
