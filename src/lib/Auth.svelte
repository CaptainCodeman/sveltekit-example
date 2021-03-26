<script lang="ts">
  import { auth } from './auth'
</script>

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

{#if $auth.known}
  {#if $auth.user}
    <button on:click={() => auth.signOut()}>Sign Out</button>{$auth.user.displayName} ({$auth.user.email})
  {:else}
    <button on:click={() => auth.signInWith('google')}>Sign In with Google</button>(visitor)
  {/if}
{:else}
  Checking auth status &hellip;
{/if}
