export interface Session {
  user: {
    name: string,
    email: string,
    email_verified:
    boolean,
    uid: string
  } | null
}