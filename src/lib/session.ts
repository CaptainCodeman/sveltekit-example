import { derived } from 'svelte/store'
import { browser } from '$app/environment'
import { invalidate } from '$app/navigation'
import { page } from '$app/stores'
import { dedupe } from './dedupe'
import { auth } from './auth'

// derived store from page data to provide our session
export const session = dedupe(derived(page, $page => $page.data.session))

// if we're using session, we need to keep the server-side auth-state in sync with the client
// this subscribes to the firebase client-side auth state and posts changes back to the server
// to populate a firebase server-side cookie to mirror it
async function syncSession() {
  if (!browser) return

  // we use onIdTokenChanged instead of onAuthStateChanged so we can keep tokens refreshed
  const { onIdTokenChanged, getIdToken } = await import('firebase/auth')

  auth.subscribe($auth => {
    if ($auth) {
      onIdTokenChanged($auth, async user => {
        // set or clear the session using the user state / idToken
        const req = user
          ? fetch('/session', {
            method: 'post',
            body: await getIdToken(user),
          })
          : fetch('/session', {
            method: 'delete'
          })
        const res = await req

        // TODO: handle errors if session can't be set on server ...

        // invalidate the session to re-populate the session store
        await invalidate()
      })
    }
  })
}

syncSession()
