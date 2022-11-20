// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { Admin } from '$lib/types'

// and what to do when importing types
declare global {
	namespace App {
		interface Locals {
			admin?: Admin
		}
		// interface PageData {}
		// interface Error {}
		// interface Platform {}
	}
}
