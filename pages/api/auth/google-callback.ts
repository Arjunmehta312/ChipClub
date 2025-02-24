import { getSession } from "next-auth/react"
import { prisma } from "@/lib/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req })
    if (!session?.user?.email) {
      return res.redirect('/signup?error=SignUpFailed')
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!existingUser) {
      // Get referral code from query parameter
      const { referralCode } = req.query

      if (!referralCode) {
        return res.redirect('/signup?error=NoReferralCode')
      }

      // Verify referral code
      const referrer = await prisma.user.findFirst({
        where: { referralCode: referralCode as string },
      })

      if (!referrer) {
        return res.redirect('/signup?error=InvalidReferralCode')
      }

      // Create new user with referral
      await prisma.user.create({
        data: {
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
          invitedById: referrer.id,
        },
      })
    }

    return res.redirect('/dashboard')
  } catch (error) {
    console.error("Google callback error:", error)
    return res.redirect('/signup?error=SignUpFailed')
  }
} 