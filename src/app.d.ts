// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  interface Locals {
    // user is populated from the session cookie
    user: import('firebase-admin/auth').DecodedIdToken | null
  }

  // interface Platform {}
  interface PageData {
    // we're making user a property of session in case it needs to contain other things
    // it would be possible, for instance, to have use preferences set even if not auth'd
    session: import('$lib/types').Session
  }

  // interface PrivateEnv {}
  // interface PublicEnv {}
}
