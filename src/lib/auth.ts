import { writable } from 'svelte/store'
import { browser } from '$app/env'
import { getAuth, onAuthStateChanged, signInWithRedirect, signOut as _signOut, GoogleAuthProvider } from "firebase/auth"
import type { User } from "firebase/auth"
import { app } from './firebase'

export interface AuthState {
  // auth.user will be either a firebase User object or null
  user: User | null
  // auth.known is whether or not we have completed trying to login with firebase
  // --i.e. if `true` then we "know" that we have a user or we "know" that we don't,
  // but when the store is first initialized we don't "know" anything.
  known: boolean
}

// TODO: Why is this written as a function returning a store instead of export const auth={...}?
// (in my testing it seems to work the other way, so I'm guessing just coding style?)
const createAuth = () => {
  
  // Here we are creating a writable store, and destructuring it to obtain 
  // the 'subscribe' and 'set' methods for later use in async functions.
  // This is the same as `const user = writable({ user: null, known: false })`
  // if we wanted to use user.set() in later code.
  // here the user is null, 
  const { subscribe, set } = writable<AuthState>({ user: null, known: false })

  // TODO: Why is this a separate function, and why is it async?
  async function listen() {
    // Here we are initializing the firebase auth object
    const auth = getAuth(app)
    // Here we are setting a listener to be called whenever the auth state changes
    // TODO: why is the unsubscribe function returned from `onAuthStateChanged` not used,
    // and why does this not lead to potential memory leaks? (Or does it?)
    onAuthStateChanged(auth,
      // This function takes the firebase User object provided to it
      // and then sets the svelte store (initialized above).
      user => set({ user, known: true }),
      // The error handler for this example just writes the error to the console
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

  // This is a helper function to get the auth provider for login.
  // It will not be avialble in the export.
  function providerFor(name: string) {
    switch (name) {
      case 'google':   return new GoogleAuthProvider()
      default:         throw 'unknown provider ' + name
    }
  }

  // This function will be available as `auth.signInWith(providerName)`
  // Calling it will trigger an authStateChange event, causing
  // the listener set above to set the auth store with the new value.
  async function signInWith(name: string) {
    const auth = getAuth(app)
    const provider = providerFor(name)
    await signInWithRedirect(auth, provider)
  }

  // This function will be avaialble as `auth.signOut()`
  // Calling it will trigger an authStateChange event, causing
  // the listener set above to set the auth store with the new value.
  async function signOut() {
    const auth = getAuth(app)
    await _signOut(auth)
  }

  // Here is the store that is returned as the export.
  // Now we can `import { auth } from '$lib/auth'`,
  // and in our components, we can call `$auth` to subscribe to the value of the auth store, 
  // or we can call `auth.signInWith(providerName)` or `auth.signOut()` without subscribing.
  return {
    subscribe,
    signInWith,
    signOut,
  }
}

export const auth = createAuth()
