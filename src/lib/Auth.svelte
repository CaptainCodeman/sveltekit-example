<script lang="ts">
	import { auth } from './auth'
	import { session } from './session'
</script>

<!-- using the session state avoids the initial delay while the client auth resolves -->
{#if $session.user}
	<button on:click={() => auth.signOut()}>Sign Out</button>{$session.user.name} ({$session.user.email})
{:else}
	<button on:click={() => auth.signInWith('google')}>Sign In with Google</button>(visitor)
{/if}

<style>
	button {
		padding: 6px 12px;
		border: none;
		border-radius: 4px;
		color: #fff;
		background-color: #93f;
		margin-right: 12px;
	}
</style>
