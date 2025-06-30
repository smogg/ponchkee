import { createFileRoute, redirect } from '@tanstack/react-router';

export const indexRoute = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({
      to: '/dashboard',
    });
  },
});
