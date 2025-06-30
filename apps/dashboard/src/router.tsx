import { createRouter } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import { rootRoute } from './routes/__root';
import { indexRoute } from './routes/index';
import { dashboardRoute } from './routes/dashboard';
import { loginRoute } from './routes/login';

const queryClient = new QueryClient();

export const router = createRouter({
  routeTree: rootRoute.addChildren([
    indexRoute,
    dashboardRoute,
    loginRoute,
  ]),
  context: {
    queryClient,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}