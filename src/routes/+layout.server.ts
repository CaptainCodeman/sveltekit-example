import type { LayoutServerLoad } from './$types'
import { getSession } from './session/+server'

export const load: LayoutServerLoad = async ({ locals }) => {
  // session consists of just the user object, but could contain other preferences
  const { user } = locals
  const session = getSession(user)

  // layout data could also return additional data other than the session
  return { session }
}