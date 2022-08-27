import { browser } from '$app/env'
import { invalidate } from '$app/navigation'
import type { Auth, User } from 'firebase/auth'
import { derived, type Readable } from 'svelte/store'
import { auth } from './auth'

function createUser() {
  const { subscribe } = derived<Readable<Auth>, User | null>(
    auth,
    ($auth, set) => {
      let unsubscribe = () => { }

      async function init() {
        if ($auth) {
          const { onAuthStateChanged, getIdToken } = await import('firebase/auth')

          unsubscribe = onAuthStateChanged($auth, async user => {
            set(user)

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
            console.log(res.status, res.statusText)

            console.log('invalidate data')
            await invalidate()
          })
        }
      }

      if (browser) init()

      return unsubscribe
    }
  )

  return { subscribe }
}

export const user = createUser()
