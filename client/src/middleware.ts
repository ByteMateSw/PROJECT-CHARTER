export { default } from 'next-auth/middleware'

export const config = { matcher: ["/dashboard/hire", '/dashboard/jobs', '/settings'] }