<script lang="ts">
	import type { LayoutData } from './$types'

	export let data: LayoutData

	$: ({ user } = data)
</script>

<nav>
	<a href="/">Home</a>
	<a href="/authed">Authed Page</a>
</nav>

<main>
	<slot />
</main>

data:
<pre>{JSON.stringify(data, null, 2)}</pre>

user:
<pre>{JSON.stringify(user, null, 2)}</pre>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}
</style>
