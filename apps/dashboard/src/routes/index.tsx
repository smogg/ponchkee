import { createFileRoute } from '@tanstack/react-router'
import {
  SignedIn,
  UserButton,
  SignOutButton,
  SignedOut,
  SignInButton,
  SignUpButton,
} from '@clerk/tanstack-react-start'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="p-2">
      <SignedIn>
        <UserButton />
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
    </div>
  )
}
