import NextAuth, { NextAuthOptions, Profile } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"

// Extend the Profile type to include referralCode
interface ExtendedProfile extends Profile {
  referralCode?: string
}

// Extend the Session type
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email?: string | null
      name?: string | null
      image?: string | null
    }
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        referralCode: { label: "Referral Code", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.password) {
          throw new Error("Invalid credentials")
        }

        const isValid = await compare(credentials.password, user.password)

        if (!isValid) {
          throw new Error("Invalid credentials")
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "google") {
          // Check if user exists
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          })

          if (!existingUser) {
            // Get referral code from state parameter
            const referralCode = account.state?.split('referral:')[1]
            
            if (!referralCode) {
              return '/signup?error=NoReferralCode'
            }

            // Verify referral code
            const referrer = await prisma.user.findFirst({
              where: { referralCode },
            })

            if (!referrer) {
              return '/signup?error=InvalidReferralCode'
            }

            // Create new user with referral and generate a new referral code
            await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name,
                image: user.image,
                invitedById: referrer.id,
                referralCode: `${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
              },
            })
          }
        }
        return true
      } catch (error) {
        console.error("Error in signIn callback:", error)
        return '/signup?error=SignUpFailed'
      }
    },
    async redirect({ url, baseUrl }) {
      // Handle custom callback
      if (url.startsWith('/api/auth/google-callback')) {
        const referralCode = typeof window !== 'undefined' ? 
          localStorage.getItem('referralCode') : null
        return `${baseUrl}/api/auth/google-callback?referralCode=${referralCode}`
      }
      return url.startsWith(baseUrl) ? url : baseUrl
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
}

export default NextAuth(authOptions) 