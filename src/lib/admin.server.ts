import { initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

const useEmulator = true

if (useEmulator) {
  process.env['FIREBASE_AUTH_EMULATOR_HOST'] = '127.0.0.1:9099'
}

// this is the server-side firebase client
export const app = initializeApp({ projectId: 'demo-sveltekit' })
export const auth = getAuth(app)