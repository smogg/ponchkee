import { createFileRoute } from '@tanstack/react-router';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

export const dashboardRoute = createFileRoute('/dashboard')({
  component: Dashboard,
});

function Dashboard() {
  return (
    <>
      <SignedIn>
        <div>
          <h1>Welcome to the Dashboard!</h1>
          <p>This is a protected route.</p>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
