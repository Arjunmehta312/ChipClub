import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const { email, password, referralCode } = req.body

    if (!email || !password || !referralCode) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    // Check if referral code is valid
    const referrer = await prisma.user.findFirst({
      where: { referralCode },
    })

    if (!referrer) {
      return res.status(400).json({ message: "Invalid referral code" })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" })
    }

    // Create new user
    const hashedPassword = await hash(password, 12)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        invitedById: referrer.id,
      },
    })

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        email: user.email,
        referralCode: user.referralCode,
      },
    })
  } catch (error) {
    console.error("Signup error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
} 