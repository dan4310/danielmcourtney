<script lang="ts">
	import Drawer from '$lib/components/Drawer.svelte'
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
		<button class="btn-sidemenu btn-round" type="button" on:click={() => (open = true)}>
			<i class="fa fa-bars" />
		</button>
		<Drawer {open} on:close={() => (open = false)}>
			<ul class="sidemenu">
				<li><a class="sidemenu__link" href="/about">About</a></li>
				<li><a class="sidemenu__link" href="/experience">Experience</a></li>
				<li><a class="sidemenu__link" href="/projects">Projects</a></li>
				<li><a class="sidemenu__link btn-outline-primary" href="/contact">Contact</a></li>
			</ul>
		</Drawer>
	</div>
</header>
<div class="content">
	<slot />
	<footer class="footer">
		<div class="footer__main">
			<div class="footer__location">
				<h3>NEW YORK</h3>
				<div>
					<span>161 Floral Boulevard</span>
					<span>New York, NY 11001</span>
				</div>
				<div>
					<div style="flex-direction: row; gap: 8px; align-items: center;">
						<i class="fa-solid fa-phone"></i>
						<span>917-328-6951</span>
					</div>
					<div style="flex-direction: row; gap: 8px; align-items: center;">
						<i class="fa-regular fa-envelope"></i>
						<span>dan4310@gmail.com</span>
					</div>
				</div>
			</div>
			<div class="footer__socials">
				<a href="https://github.com/dan4310/">
					<i class="fa fa-github"></i>
				</a>
				<a href="https://www.linkedin.com/in/daniel-c-a6407710b/">
					<i class="fa-brands fa-linkedin"></i>
				</a>
				<a href="/documents/resume.pdf">
					<i class="fa fa-file-pdf"></i>
				</a>
			</div>
		</div>
		<hr />
		<div class="footer__bottom">
			<p>Copyright @ 2022 <a href="/">danielmcourtney.com</a></p>
			<p>Designed by Daniel Courtney</p>
		</div>
	</footer>
</div>

<style lang="scss">
	@use '../../styles/breakpoints' as b;
	@use '../../styles/variables' as var;
	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}

	.footer {
		background-color: var.$theme-foreground;
		margin-top: var.$padding-xl;
		padding: var.$padding-sm;
		border-top: var.$border-thickness solid var.$theme-divider;
		display: flex;
		flex-direction: column;
		gap: var.$padding-lg;
		.footer__main {
			display: flex;
			flex-direction: column;
			gap: var.$padding-lg;
			@include b.break(sm) {
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
			}
			.footer__location {
				color: var.$theme-text-muted;
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: var.$padding;
				@include b.break(sm) {
					align-items: start;
				}
				div {
					display: flex;
					flex-direction: column;
					font-size: var.$font-size-sm;
				}
				h3 {
					color: var.$theme-text;
				}
				font-weight: 100;
			}
			.footer__socials {
				display: flex;
				justify-content: space-around;
				gap: var.$padding-md;
				i {
					font-size: 40px;
				}
				@include b.break(sm) {
					justify-content: right;
				}
			}
		}
		.footer__bottom {
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: var.$theme-text-muted;
			font-weight: 100;
			font-size: var.$font-size-sm;
			a {
				transition: color ease-in-out 0.15s;
				text-decoration: underline;
				&:hover {
					color: var.$color-primary;
				}
			}
		}
	}

	.avatar {
		width: 40px;
		border-radius: 100px;
	}
</style>
