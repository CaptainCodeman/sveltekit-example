import { derived, writable } from 'svelte/store'
import { browser } from '$app/environment'
import { page } from '$app/stores'
import { auth } from './auth'
import { dedupe } from './dedupe'
import type { Session } from './types'

// internal store allows us to override the page data session without having to invalidate LayoutData
const internal = writable<Session>()

// derived store from page data to provide our session
const external = dedupe(derived(page, $page => $page.data.session))

export const session = derived([internal, external], ([$internal, $external]) => $internal || $external)

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

        // TODO: handle errors if session can't be set on server ...
        const res = await req
        const data: Session = await res.json()
        internal.set(data)
      })
    }
  })
}

syncSession()
