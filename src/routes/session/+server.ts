import { serialize } from 'cookie'
import { dev } from '$app/environment'
import type { RequestHandler } from './$types'
import { auth } from '$lib/admin'
import { json } from '@sveltejs/kit'
import type { DecodedIdToken } from 'firebase-admin/auth'

const WEEK_IN_SECONDS = 60 * 60 * 24 * 7
const WEEK_IN_MILLISECONDS = WEEK_IN_SECONDS * 1000

// POST receives the client-side auth token, validates it and sets a cookie for future server-requests
export const POST: RequestHandler = async ({ request }) => {
  const token = await request.text()

  const user = await auth.verifyIdToken(token)
  const sessionCookie = await auth.createSessionCookie(token, { expiresIn: WEEK_IN_MILLISECONDS })
  const options = { maxAge: WEEK_IN_SECONDS, httpOnly: true, secure: !dev }
  const cookie = serialize('session', sessionCookie, options)

  return json(getSession(user), { headers: { 'Set-Cookie': cookie } })
}

// DELETE clears the session cookie
export const DELETE: RequestHandler = async ({ }) => {
  const options = { expires: new Date(0), httpOnly: true, secure: !dev }
  const cookie = serialize('session', '', options)

  return json(getSession(null), { headers: { 'Set-Cookie': cookie } })
}

export function getSession(user: DecodedIdToken | null) {
  return { user }
}