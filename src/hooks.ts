import { auth } from '$lib/admin'
import type { Handle } from '@sveltejs/kit'
import { parse } from 'cookie'

export const handle: Handle = async ({ event, resolve }) => {
  const { locals, request } = event

  const cookies = parse(request.headers.get('cookie') || '')
  const { session } = cookies

  if (session) {
    try {
      const user = await auth.verifySessionCookie(cookies.session)
      locals.user = user
    } catch (err) {
      console.error('error verifying session cookie', cookies.session, err)
    }
  }

  return resolve(event)
}