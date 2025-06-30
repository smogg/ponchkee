import { createFileRoute } from '@tanstack/react-router'
import { SignIn } from '@clerk/clerk-react'

export const Route = createFileRoute('/sign-in')({
  component: SignInPage,
})

function SignInPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-lg"
          }
        }}
      />
    </div>
  )
}
