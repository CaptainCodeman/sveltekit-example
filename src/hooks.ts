import { auth } from '$lib/admin'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  const { cookies, locals } = event

  locals.user = null  // default if session cookie fails

  // decode the cookie and get the session property
  const session = cookies.get('session')

  if (session) {
    // if session cookie is set, verify it is valid and set the user from it
    try {
      const user = await auth.verifySessionCookie(session)
      locals.user = user
    } catch (err) {
      console.error('error verifying session cookie', session, err)
    }
  }

  return resolve(event)
}