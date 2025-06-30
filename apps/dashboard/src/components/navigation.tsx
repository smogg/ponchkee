import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center mx-auto">
        <div className="mr-4 hidden md:flex">
          <Link
            to="/"
            className="mr-4 flex items-center space-x-2 lg:mr-6"
            activeOptions={{ exact: true }}
          >
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-sm bg-primary" />
              <span className="hidden font-bold lg:inline-block">
                Ponchkee
              </span>
            </div>
          </Link>
          <nav className="flex items-center gap-4 text-sm lg:gap-6">
            <Link
              to="/leads"
              className="transition-colors hover:text-foreground/80 text-muted-foreground"
            >
              Leads
              <Badge variant="secondary" className="ml-2 text-xs">
                Soon
              </Badge>
            </Link>
            <Link
              to="/analytics"
              className="transition-colors hover:text-foreground/80 text-muted-foreground"
            >
              Analytics
              <Badge variant="secondary" className="ml-2 text-xs">
                Soon
              </Badge>
            </Link>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link
              to="/"
              className="mr-2 flex items-center space-x-2 md:hidden"
            >
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 rounded-sm bg-primary" />
                <span className="font-bold">Ponchkee</span>
              </div>
            </Link>
          </div>

          <nav className="flex items-center gap-2">
            <SignedOut>
              <SignInButton>
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                    userButtonPopoverCard: "shadow-lg border",
                    userButtonPopoverActionButton: "hover:bg-muted"
                  }
                }}
              />
            </SignedIn>
          </nav>
        </div>
      </div>
    </header>
  )
}
