<script lang="ts">
	import Auth from '$lib/Auth.svelte'
</script>

<nav>
	<Auth />
</nav>

<main>
	<slot />
</main>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	nav,
	main {
		padding: 1em;
	}
</style>
