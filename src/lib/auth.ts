import { writable } from 'svelte/store'
import { browser } from '$app/env'
import type { Auth, User } from "firebase/auth"

const createAuth = () => {
  let auth: Auth

  const { subscribe } = writable<User>(undefined, set => {
    let unsubscribe = () => {}

    async function listen() {
      if (browser) {
        const { app } = await import('./app')
        const { getAuth, onAuthStateChanged } = await import('firebase/auth')

        auth = getAuth(app)

        unsubscribe = onAuthStateChanged(auth, set)
      } else {
        set(null)
      }
    }

    listen()

    return () => unsubscribe()
  })

  async function providerFor(name: string) {
    const { GoogleAuthProvider } = await import('firebase/auth')
    switch (name) {
      case 'google':   return new GoogleAuthProvider()
      default:         throw 'unknown provider ' + name
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
