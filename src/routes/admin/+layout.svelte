<script lang="ts">
	import Drawer from '$lib/components/Drawer.svelte'
	let open = false
</script>

<header class="navbar">
	<div class="navbar__left" />
	<div class="navbar__right">
		<ul class="navbar__links">
			<li><a class="navbar__link" href="/admin/about">About</a></li>
			<li><a class="navbar__link" href="/admin/experience">Experience</a></li>
			<li><a class="navbar__link" href="/admin/projects">Projects</a></li>
		</ul>
		<button class="btn-sidemenu btn-round" type="button" on:click={() => (open = true)}>
			<i class="fa fa-bars" />
		</button>
		<Drawer {open} on:close={() => (open = false)}>
			<ul class="sidemenu">
				<li><a class="sidemenu__link" href="/admin/about">About</a></li>
				<li><a class="sidemenu__link" href="/admin/experience">Experience</a></li>
				<li><a class="sidemenu__link" href="/admin/projects">Projects</a></li>
			</ul>
		</Drawer>
	</div>
</header>
<slot />
