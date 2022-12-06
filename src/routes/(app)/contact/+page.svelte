<script lang="ts">
	import { MY_EMAIL, MY_GITHUB, MY_LINKEDIN } from '$lib/config'

	let to = MY_EMAIL
	let subject = 'New Opportunity'
	let body = ''
	$: mailUrl = `mailto:${to}?subject=${subject}&body=` + body.replaceAll('\n', '%0D%0A')

	function submit() {
		location.href = mailUrl
	}
</script>

<div class="page">
	<main class="page__container-md">
		<h1>Get in touch with me.</h1>
		<ul class="socials">
			<li>
				<a href="{MY_GITHUB}">
					<i class="fa-brands fa-github"></i>
				</a>
			</li>
			<li>
				<a href="{MY_LINKEDIN}">
					<i class="fa-brands fa-linkedin"></i>
				</a>
			</li>
			<li>
				<a href="/documents/resume.pdf">
					<i class="fa-solid fa-file-pdf"></i>
				</a>
			</li>
		</ul>
		<form on:submit|preventDefault={submit}>
			<div class="form-label">
				<label for="to">To:</label>
				<input class="form-control" disabled id="to" name="to" placeholder="" bind:value={to} />
			</div>
			<div class="form-label">
				<label for="subject">Subject:</label>
				<input
					class="form-control"
					id="subject"
					name="subject"
					placeholder="New Opportunity"
					bind:value={subject}
				/>
			</div>
			<textarea
				class="form-control"
				name="body"
				id="body"
				bind:value={body}
				placeholder="I have something for you."
			/>
			<div style="display: flex; justify-content: end;">
				<button type="submit" class="btn-primary">
					<a href={mailUrl}>Send Email</a>
				</button>
			</div>
		</form>
	</main>
</div>

<style lang="scss">
	@use '../../../styles/variables' as var;

	.socials {
		display: flex;
		font-size: 45px;
		align-items: center;
		gap: var.$padding-lg;
		a {
			transition: color ease-in-out 0.25s;
			&:hover {
				color: var.$color-primary;
			}
		}
	}

	main {
		display: flex;
		flex-direction: column;
		gap: var.$padding-lg;
	}

	h1 {
		font-size: var.$font-size-lg;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: var.$padding-md;
	}

	input {
		width: 100%;
	}

	textarea {
		width: 100%;
		resize: none;
		height: 300px;
	}
</style>
