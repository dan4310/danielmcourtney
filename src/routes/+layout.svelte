<script lang="ts">
	import Drawer from '$lib/components/Drawer.svelte'
	import '$styles/index.scss'
	let scrollY = 0

	let open = false
</script>

<svelte:window bind:scrollY />
<svelte:head>
	<title>Daniel Courtney</title>
</svelte:head>

<header class="navbar" class:active={scrollY > 50}>
	<div class="navbar__left">
		<img class="avatar" src="/images/michaelangelo.jpeg" alt="Me icon" />
		<a href="/"><h3>Daniel Courtney</h3></a>
	</div>
	<div class="navbar__right">
		<ul class="navbar__links">
			<li><a class="navbar__link" href="/about">About</a></li>
			<li><a class="navbar__link" href="/experience">Experience</a></li>
			<li><a class="navbar__link" href="/projects">Projects</a></li>
			<li><a class="btn-outline-primary" href="/contact">Contact</a></li>
		</ul>
		<button class="btn-menu btn-primary" type="button" on:click={() => (open = true)}>M</button>
		<Drawer {open} on:close={() => (open = false)}>
			<ul class="sidemenu">
				<li><a class="sidemenu__link" href="/about">About</a></li>
				<li><a class="sidemenu__link" href="/experience">Experience</a></li>
				<li><a class="sidemenu__link" href="/projects">Projects</a></li>
			</ul>
		</Drawer>
	</div>
</header>
<slot />

<style lang="scss">
	@use '../styles/breakpoints' as b;
	@use '../styles/variables' as var;

	.avatar {
		width: 40px;
		border-radius: 100px;
	}
	.btn-menu {
		@include b.break(sm) {
			display: none;
		}
	}

	.sidemenu {
		display: flex;
		flex-direction: column;
		gap: var.$padding;
		li {
			display: flex;
			&:hover {
				color: var.$theme-text-muted;
			}
		}
		.sidemenu__link {
			width: 100%;
			display: flex;
			justify-content: center;
		}
	}
</style>
