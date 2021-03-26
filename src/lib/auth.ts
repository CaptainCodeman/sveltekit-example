import type { default as firebase } from 'firebase'

import { writable } from 'svelte/store'
import { browser } from '$app/env'
import { loadAuth } from './firebase'

export interface AuthState {
  user: firebase.User | null
  known: boolean
}

const createAuth = () => {
  const { subscribe, set } = writable<AuthState>({ user: null, known: false })

  async function listen() {
    const auth = await loadAuth
    auth.onAuthStateChanged(
      user => set({ user, known: true }),
      err => console.error(err.message),
    )
  }

  if (browser) {
    // listen to auth changes on client
    listen()
  } else {
    // no auth on server in this example
    set({ user: null, known: true })
  }

  async function providerFor(name: string) {
    const auth = await loadAuth
    switch (name) {
      case 'google':   return new window.firebase.auth.GoogleAuthProvider()
      case 'facebook': return new window.firebase.auth.FacebookAuthProvider()
      case 'twitter':  return new window.firebase.auth.TwitterAuthProvider()
      default:         throw 'unknown provider ' + name
    }
  }

  async function signInWith(name: string) {
    const auth = await loadAuth
    const provider = await providerFor(name)
    await auth.signInWithRedirect(provider)
  }

  async function signOut() {
    const auth = await loadAuth
    await auth.signOut()
  }

  return {
    subscribe,
    signInWith,
    signOut,
  }
}

export const auth = createAuth()
