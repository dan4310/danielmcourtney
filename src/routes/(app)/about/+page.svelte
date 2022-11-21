<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
</script>

<div class="page">
	<main class="page__container-lg">
		<section class="about-me">
			<div class="about-me__img">
				<img src={data.about.image} alt="Daniel" />
			</div>
			<div class="about-me__main">
				<div>
					<span>{data.about.subtitle.toUpperCase()}</span>
					<h1>{data.about.title}</h1>
				</div>
				<p>{data.about.description}</p>
			</div>
		</section>
	</main>
</div>

<style lang="scss">
	@use '../../../styles/variables' as var;
	@use '../../../styles/breakpoints' as b;

	.about-me {
		display: flex;
		flex-direction: column;
		gap: var.$padding-md;
		.about-me__img {
			border-radius: var.$border-radius;
			flex: 1;
			img {
				width: 100%;
				border-radius: var.$border-radius;
			}
		}

		.about-me__main {
			flex: 2;
			display: flex;
			flex-direction: column;
			gap: var.$padding;
			span {
				color: var.$color-primary;
				font-size: var.$font-size;
				font-weight: 900;
			}
			h1 {
				font-size: var.$font-size-xl;
			}
			p {
				font-size: var.$font-size;
				line-height: var.$font-size * 1.5;
			}
		}

		@include b.break(sm) {
			flex-direction: row;
		}
	}
</style>
