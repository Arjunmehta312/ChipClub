import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // You can add custom logic here
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // Return true if the user is authenticated
        return !!token
      },
    },
  }
)

// Specify which routes should be protected
export const config = { 
  matcher: ["/dashboard/:path*", "/profile/:path*", "/game/:path*"] 
}
