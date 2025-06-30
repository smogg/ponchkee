import { createFileRoute } from '@tanstack/react-router';
import { SignIn } from '@clerk/clerk-react';

export const loginRoute = createFileRoute('/login')({
  component: Login,
});

function Login() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <SignIn routing="path" path="/login" />
    </div>
  );
}
