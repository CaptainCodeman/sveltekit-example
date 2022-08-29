import { browser, dev } from '$app/environment'
import type { FirebaseApp, FirebaseOptions } from 'firebase/app'
import { readable } from 'svelte/store'
import {
  PUBLIC_FIREBASE_API_KEY,
  PUBLIC_FIREBASE_AUTH_DOMAIN,
  PUBLIC_FIREBASE_PROJECT_ID,
  PUBLIC_FIREBASE_STORAGE_BUCKET,
  PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  PUBLIC_FIREBASE_APP_ID,
} from '$env/static/public'

const firebaseConfig: FirebaseOptions = dev
  ? { apiKey: 'demo', authDomain: 'demo.firebaseapp.com' }
  : {
    apiKey: PUBLIC_FIREBASE_API_KEY,
    authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
    appId: PUBLIC_FIREBASE_APP_ID,
  }

// load the firebase app on demand by putting it in a store
// this can then be used in derived stores for auth, firestore, and other services
function createApp() {
  let app: FirebaseApp

  const { subscribe } = readable<FirebaseApp>(undefined, (set) => {
    async function init() {
      if (!app) {
        const { initializeApp } = await import('firebase/app')
        app = initializeApp(firebaseConfig)
      }
      set(app)
    }

    if (browser) init()
  })

  return { subscribe }
}

export const app = createApp()
