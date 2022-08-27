<script lang="ts">
	import { auth } from './auth'
	import { user } from './user'
</script>

{#if $user === undefined}
	Checking auth status &hellip;
{:else if $user === null}
	<button on:click={() => auth.signInWith('google')}>Sign In with Google</button>(visitor)
{:else}
	<button on:click={() => auth.signOut()}>Sign Out</button>{$user.displayName} ({$user.email})
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
