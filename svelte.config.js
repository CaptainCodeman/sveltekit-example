import fs from 'fs'
import preprocess from 'svelte-preprocess'
import adapt from '@sveltejs/adapter-node'

const firebase = JSON.parse(fs.readFileSync('node_modules/firebase/package.json', 'utf8'))

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),
	kit: {
		// By default, `npm run build` will create a standard Node app.
		// You can create optimized builds for different platforms by
		// specifying a different adapter
		adapter: adapt(),

		vite: {
			build: {
				sourcemap: true,
			},
			define: {
				FIREBASE_SDK_VERSION: JSON.stringify(firebase.version),
			}
		}
	}
}

export default config
