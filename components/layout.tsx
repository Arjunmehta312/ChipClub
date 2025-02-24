import type React from "react"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react"
import { useSession, signOut } from "next-auth/react"

export function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-background">
      <Navbar isBordered className="bg-background">
        <NavbarBrand>
          <Link href="/" className="text-foreground">
            <p className="font-bold">ChipClub</p>
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {session && (
            <>
              <NavbarItem>
                <Link className="text-foreground" href="/dashboard">
                  Find Games
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link className="text-foreground" href="/dashboard">
                  My Games
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link className="text-foreground" href="/dashboard">
                  Profile
                </Link>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
        <NavbarContent justify="end">
          {session ? (
            <>
              <NavbarItem>
                <Button color="danger" variant="flat" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </NavbarItem>
            </>
          ) : (
            <>
              <NavbarItem className="hidden lg:flex">
                <Link href="/login">Login</Link>
              </NavbarItem>
              <NavbarItem>
                <Button as={Link} color="primary" href="/signup" variant="flat">
                  Sign Up
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

