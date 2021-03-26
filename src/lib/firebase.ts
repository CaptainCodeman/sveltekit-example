import type { default as firebase } from 'firebase'

import { LazyPromise } from './lazy-promise'

declare global {
  interface Window {
    firebase: typeof firebase
  }
}

const firebaseConfig = {
  apiKey: "AIzaSyBzbLDdqWRL-zvw3UiTvvQufiEjLNNqUUc",
  authDomain: "captaincodeman-experiment.firebaseapp.com",
  databaseURL: "https://captaincodeman-experiment.firebaseio.com",
  projectId: "captaincodeman-experiment",
  storageBucket: "captaincodeman-experiment.appspot.com",
  messagingSenderId: "341877389348",
  appId: "1:341877389348:web:7c926f1f20ca49476b00b1"
}

const loadScript = (url: string) => new Promise<Event>((resolve, reject) => {
  const script = document.createElement('script')
  script.src = url
  script.async = true
  script.onload = resolve
  script.onerror = reject
  document.head.appendChild(script)
})

// this is replaced by vite to use the version of firebase defined in package.json
// see svelte.config.cjs
declare const FIREBASE_SDK_VERSION: string
const firebase_sdk_version = FIREBASE_SDK_VERSION

const moduleURL = (module: string) => `https://www.gstatic.com/firebasejs/${firebase_sdk_version}/firebase-${module}.js`

const loadModule = (module: string) => loadScript(moduleURL(module))

const loadFirebase = LazyPromise.from(async () => {
  await loadModule('app')
  return window.firebase
})

const initializeApp = LazyPromise.from(async () => {
  const firebase = await loadFirebase
  return firebase.initializeApp(firebaseConfig)
})

export const loadAuth = LazyPromise.from(async () => {
  const app = await initializeApp
  await loadModule('auth')
  return app.auth()
})

export const loadDatabase = LazyPromise.from(async () => {
  const app = await initializeApp
  await loadModule('database')
  return app.database()
})

export const loadFirestore = LazyPromise.from(async () => {
  const app = await initializeApp
  await loadModule('firestore')
  const firestore = app.firestore()
  await firestore.enablePersistence({ synchronizeTabs: true })
  return firestore
})

export const loadStorage = LazyPromise.from(async () => {
  const app = await initializeApp
  await loadModule('storage')
  return app.storage()
})
