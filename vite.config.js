import { sveltekit } from '@sveltejs/kit/vite'
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	server: {
		host: 'localhost',
		port: 3000,
	},
}

export default config
