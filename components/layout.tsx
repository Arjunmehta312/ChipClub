import type React from "react"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/router"

export function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <Navbar isBordered className="bg-background">
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit">
            ChipClub
          </Link>
        </NavbarBrand>
        <NavbarContent justify="end">
          {!session ? (
            <>
              <NavbarItem>
                <Button 
                  as={Link} 
                  href="/login" 
                  variant="light"
                >
                  Login
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button 
                  as={Link} 
                  href="/signup" 
                  color="primary"
                >
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          ) : (
            <>
              <NavbarItem>
                <Button 
                  as={Link} 
                  href="/dashboard" 
                  variant="light"
                >
                  Dashboard
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button 
                  color="danger" 
                  variant="flat"
                  onPress={() => signOut({ callbackUrl: '/' })}
                >
                  Sign Out
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      </Navbar>
      <main className="text-foreground">{children}</main>
    </div>
  )
}

