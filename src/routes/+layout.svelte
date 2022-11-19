<script lang="ts">
	import '$styles/index.scss'
	let scrollY = 0
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
		</ul>
		<a class="btn-outline-primary" href="/contact">Contact</a>
	</div>
</header>
<slot />

<style>
	.avatar {
		width: 40px;
		border-radius: 100px;
	}
</style>
