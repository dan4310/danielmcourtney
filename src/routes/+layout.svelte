<script lang="ts">
	import '$styles/index.scss'
</script>

<svelte:head>
	<title>Daniel Courtney</title>
</svelte:head>


<header class="navbar">
	<div class="navbar__left">
		<img src="images/michaelangelo.png" alt="Me icon" />
		<h3>Daniel Courtney</h3>
	</div>
	<ul class="navbar__links">
		<li><a class="navbar__link" href="/about">About</a></li>
		<li><a class="navbar__link" href="/experience">Experience</a></li>
		<li><a class="navbar__link" href="/projects">Projects</a></li>
	</ul>
</header>
<slot />

