import { getAuth } from '@clerk/tanstack-react-start/server'
import { createMiddleware } from '@tanstack/react-start'

export const authMiddleware = createMiddleware({ type: 'request' }).server(
  async ({ next, request }) => {
    const auth = await getAuth(request)
    
    if (!auth.userId) {
      throw new Response('Unauthorized', { status: 401 })
    }
    
    return next({ 
      context: { 
        userId: auth.userId,
        sessionId: auth.sessionId
      } 
    })
  }
)