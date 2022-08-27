import { serialize, type CookieSerializeOptions } from 'cookie'
import { dev } from '$app/env'
import type { RequestHandler } from './$types'
import { auth } from '$lib/admin'

const WEEK_IN_SECONDS = 60 * 60 * 24 * 7
const WEEK_IN_MILLISECONDS = WEEK_IN_SECONDS * 1000

export const POST: RequestHandler = async ({ request }) => {
  const token = await request.text()

  const sessionCookie = await auth.createSessionCookie(token, { expiresIn: WEEK_IN_MILLISECONDS })
  const options: CookieSerializeOptions = { maxAge: WEEK_IN_SECONDS, httpOnly: true, secure: !dev, sameSite: 'strict' }
  const cookie = serialize('session', sessionCookie, options)

  return new Response(null, { headers: { 'Set-Cookie': cookie } })
}

export const DELETE: RequestHandler = async ({ }) => {
  const options = { expires: new Date(0), httpOnly: true, secure: !dev }
  const cookie = serialize('session', '', options)

  return new Response(null, { headers: { 'Set-Cookie': cookie } })
}