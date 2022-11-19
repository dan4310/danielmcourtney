<script lang="ts">
	let to = 'dan4310@gmail.com'
	let subject = 'New Opportunity'
	let body = ''
	$: mailUrl = `mailto:${to}?subject=${subject}&body=` + body.replaceAll('\n', '%0D%0A')

	function submit() {
		// location.href = mailUrl
		console.log(mailUrl)
	}
</script>

<div class="page">
	<main class="page__container-md">
		<h1>Get in touch with me.</h1>
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
	@use '../../styles/variables' as var;

	h1 {
		margin-bottom: var.$padding-lg;
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
