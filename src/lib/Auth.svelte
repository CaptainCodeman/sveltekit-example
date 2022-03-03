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

{#if $auth === undefined}
  Checking auth status &hellip;
{:else}
  {#if $auth === null}
    <button on:click={() => auth.signInWith('google')}>Sign In with Google</button>(visitor)
  {:else}
    <button on:click={() => auth.signOut()}>Sign Out</button>{$auth.displayName} ({$auth.email})
  {/if}
{/if}
