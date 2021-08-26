import { writable } from 'svelte/store'
import { browser } from '$app/env'
import { getAuth, onAuthStateChanged, signInWithRedirect, signOut as _signOut, GoogleAuthProvider } from "firebase/auth"
import type { User } from "firebase/auth"
import { app } from './firebase'

export interface AuthState {
  user: User | null
  known: boolean
}

const createAuth = () => {
  const { subscribe, set } = writable<AuthState>({ user: null, known: false })
  const auth = getAuth(app)

  async function listen() {
    onAuthStateChanged(auth,
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

  function providerFor(name: string) {
    switch (name) {
      case 'google':   return new GoogleAuthProvider()
      default:         throw 'unknown provider ' + name
    }
  }

  async function signInWith(name: string) {
    const provider = providerFor(name)
    console.log(auth, provider)
    await signInWithRedirect(auth, provider)
  }

  async function signOut() {
    await _signOut(auth)
  }

  return {
    subscribe,
    signInWith,
    signOut,
  }
}

export const auth = createAuth()
