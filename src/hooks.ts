import { auth } from '$lib/admin'
import type { Handle } from '@sveltejs/kit'
import { parse } from 'cookie'

export const handle: Handle = async ({ event, resolve }) => {
  const { locals, request } = event

  locals.user = null  // default if session cookie fails

  // decode the cookie and get the session property
  const cookies = parse(request.headers.get('cookie') || '')
  const { session } = cookies

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