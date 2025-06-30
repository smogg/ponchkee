import { createServerFileRoute } from '@tanstack/react-start/server'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { createMiddleware, json } from '@tanstack/react-start'
import type { User } from '~/utils/users'
import { authMiddleware } from '~/lib/auth'

const userLoggerMiddleware = createMiddleware({ type: 'request' }).server(
  async ({ next, request }) => {
    console.info('In: /users')
    console.info('Request Headers:', getRequestHeaders())
    const result = await next()
    result.response.headers.set('x-users', 'true')
    console.info('Out: /users')
    return result
  },
)


export const ServerRoute = createServerFileRoute('/api/users')
  .middleware([authMiddleware, userLoggerMiddleware])
  .methods({
    GET: async ({ request, context }) => {
      console.info('GET /api/users @', request.url)
      console.info('Authenticated user:', context.userId)
      console.info('Fetching users... @', request.url)
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!res.ok) {
        throw new Error('Failed to fetch users')
      }

      const data = (await res.json()) as Array<User>

      const list = data.slice(0, 10)

      return json(list.map((u) => ({ id: u.id, name: u.name, email: u.email })))
    },
  })
