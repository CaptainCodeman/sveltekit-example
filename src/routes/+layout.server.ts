import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
  // session consists of just the user object, but could contain other preferences
  const { user } = locals
  const session = { user }

  // layout data could also return additional data other than the session
  return { session }
}