import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '@clerk/tanstack-react-start'
import { Navigate } from '@tanstack/react-router'
import { PricingTable, Protect } from '@clerk/clerk-react'

export const Route = createFileRoute('/')({
  component: Dashboard,
})

function Dashboard() {
  const { isSignedIn, isLoaded, has } = useAuth()

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />
  }

  const hasBronzePlan = has({ plan: 'bronze' })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your protected dashboard!
        </p>
      </div>

      {!hasBronzePlan && (
        <div className="rounded-lg border bg-card p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">Upgrade to Bronze Plan</h2>
            <p className="text-muted-foreground">
              Unlock all features with our Bronze plan subscription.
            </p>
          </div>
          <PricingTable />
        </div>
      )}

      <Protect
        plan="bronze"
        fallback={
          <div className="rounded-lg border bg-muted/20 p-6">
            <p className="text-muted-foreground">
              This section is only available to Bronze plan subscribers.
            </p>
          </div>
        }
      >
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Bronze Plan Features</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-4">
              <h3 className="font-semibold">Lead Management</h3>
              <p className="text-sm text-muted-foreground">
                Manage your WhatsApp leads and qualification funnels.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <h3 className="font-semibold">Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Track your business performance and conversion rates.
              </p>
            </div>
          </div>
        </div>
      </Protect>
    </div>
  )
}
