import { derived, type Readable } from 'svelte/store'
import { browser, dev } from '$app/env'
import type { Auth } from "firebase/auth"
import type { FirebaseApp } from 'firebase/app'
import { app } from './app'

const createAuth = () => {
  let auth: Auth

  const { subscribe } = derived<Readable<FirebaseApp>, Auth>(
    app,
    ($app, set) => {
      async function init() {
        if ($app && !auth) {
          const { getAuth, connectAuthEmulator } = await import('firebase/auth')
          auth = getAuth($app)
          if (dev) {
            connectAuthEmulator(auth, 'http://localhost:9099')
          }
          set(auth)
        }
      }

      if (browser) init()
    }
  )

  async function providerFor(name: string) {
    const { GoogleAuthProvider } = await import('firebase/auth')
    switch (name) {
      case 'google': return new GoogleAuthProvider()
      default: throw 'unknown provider ' + name
    }
  }

  async function signInWith(name: string) {
    const { signInWithRedirect } = await import('firebase/auth')
    const provider = await providerFor(name)
    await signInWithRedirect(auth, provider)
  }

  async function signOut() {
    const { signOut } = await import('firebase/auth')
    await signOut(auth)
  }

  return {
    subscribe,
    signInWith,
    signOut,
  }
}

export const auth = createAuth()
