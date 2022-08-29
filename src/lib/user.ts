import { browser } from '$app/environment'
import type { Auth, User } from 'firebase/auth'
import { derived, type Readable } from 'svelte/store'
import { auth } from './auth'

// the user store reflects the client-side auth state
function createUser() {
  const { subscribe } = derived<Readable<Auth>, User | null>(
    auth,
    ($auth, set) => {
      let unsubscribe = () => { }

      async function init() {
        if ($auth) {
          const { onAuthStateChanged } = await import('firebase/auth')
          unsubscribe = onAuthStateChanged($auth, set)
        }
      }

      if (browser) init()

      return unsubscribe
    }
  )

  return { subscribe }
}

export const user = createUser()
