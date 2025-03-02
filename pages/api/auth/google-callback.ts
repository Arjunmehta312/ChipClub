import { prisma } from "@/lib/prisma"
import { getToken } from "next-auth/jwt"
import type { NextApiRequest, NextApiResponse } from "next"

function generateUniqueReferralCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = await getToken({ 
      req,
      secret: process.env.NEXTAUTH_SECRET,
      raw: true
    })

    if (!token) {
      console.error("No token found")
      res.redirect('/pre-login?error=InvalidSession')
      return
    }

    // Parse the token to get user info
    const tokenData = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
    const userEmail = tokenData.email

    if (!userEmail) {
      console.error("No email found in token")
      res.redirect('/pre-login?error=InvalidSession')
      return
    }

    // Get referral code from cookie
    const referralCode = req.cookies['referralCode']
    
    if (!referralCode) {
      console.error("No referral code found in cookies")
      res.redirect('/pre-login?error=NoReferralCode')
      return
    }

    // Find the referrer
    const referrer = await prisma.user.findFirst({
      where: { referralCode },
      select: { id: true }
    })

    if (!referrer) {
      console.error("Invalid referral code:", referralCode)
      res.redirect('/pre-login?error=InvalidReferral')
      return
    }

    // Check if user exists and get their current referral status
    const existingUser = await prisma.user.findUnique({
      where: { email: userEmail },
      select: { id: true, invitedById: true }
    })

    if (existingUser) {
      // Update existing user with referral if not already set
      if (!existingUser.invitedById) {
        await prisma.user.update({
          where: { id: existingUser.id },
          data: { invitedById: referrer.id }
        })
      }
      res.redirect('/dashboard')
      return
    }

    // Generate unique referral code for new user
    let newReferralCode = generateUniqueReferralCode()
    let isUnique = false
    
    while (!isUnique) {
      const existing = await prisma.user.findUnique({
        where: { referralCode: newReferralCode }
      })
      if (!existing) {
        isUnique = true
      } else {
        newReferralCode = generateUniqueReferralCode()
      }
    }

    // Create new user with referral relationship
    const newUser = await prisma.user.create({
      data: {
        email: userEmail,
        name: tokenData.name || '',
        image: tokenData.picture || null,
        referralCode: newReferralCode,
        invitedById: referrer.id,
        reputation: 100,
        gamesPlayed: 0
      }
    })

    res.redirect('/dashboard')
  } catch (error) {
    console.error("Google callback error:", error)
    res.redirect('/pre-login?error=SignUpFailed')
  }
}