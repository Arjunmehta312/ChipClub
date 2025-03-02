import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import type { NextApiRequest, NextApiResponse } from "next"
import { randomBytes } from "crypto"

function generateUniqueReferralCode(): string {
  // Generate a random 8-12 character code
  const length = Math.floor(Math.random() * 5) + 8 // Random length between 8-12
  return randomBytes(length)
    .toString('base64')
    .replace(/[^A-Z0-9]/g, '')
    .substring(0, length)
    .toUpperCase()
}

// Input validation functions
function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

function isValidPassword(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, allow special characters
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\S]{8,}$/
  return passwordRegex.test(password)
}

function isValidReferralCode(code: string): boolean {
  // Allow any alphanumeric code
  const referralRegex = /^[A-Z0-9]+$/
  return referralRegex.test(code)
}

function sanitizeInput(input: string): string {
  // Remove any potentially dangerous characters
  return input.replace(/[<>{}[\]"`]/g, '')
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const { email, password, referralCode } = req.body

    // Input validation
    if (!email || !password || !referralCode) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    // Sanitize and validate email
    const sanitizedEmail = sanitizeInput(email.toLowerCase())
    if (!isValidEmail(sanitizedEmail)) {
      return res.status(400).json({ message: "Invalid email format" })
    }

    // Validate password
    if (!isValidPassword(password)) {
      return res.status(400).json({ 
        message: "Password must be at least 8 characters and contain uppercase, lowercase, and numbers" 
      })
    }

    // Sanitize and validate referral code
    const sanitizedReferralCode = sanitizeInput(referralCode.toUpperCase())
    if (!isValidReferralCode(sanitizedReferralCode)) {
      return res.status(400).json({ message: "Invalid referral code format" })
    }

    // Check if referral code is valid
    const referrer = await prisma.user.findFirst({
      where: { referralCode: sanitizedReferralCode },
    })

    if (!referrer) {
      return res.status(400).json({ message: "Invalid referral code" })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: sanitizedEmail },
    })

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" })
    }

    // Generate a unique referral code
    let newReferralCode = generateUniqueReferralCode()
    let isUnique = false
    let attempts = 0
    const maxAttempts = 10
    
    while (!isUnique && attempts < maxAttempts) {
      const existing = await prisma.user.findUnique({
        where: { referralCode: newReferralCode },
      })
      if (!existing) {
        isUnique = true
      } else {
        newReferralCode = generateUniqueReferralCode()
        attempts++
      }
    }

    if (!isUnique) {
      return res.status(500).json({ message: "Could not generate unique referral code" })
    }

    // Hash password with strong salt
    const hashedPassword = await hash(password, 12)

    // Create new user
    const user = await prisma.user.create({
      data: {
        email: sanitizedEmail,
        password: hashedPassword,
        invitedById: referrer.id,
        referralCode: newReferralCode,
        reputation: 100,
        gamesPlayed: 0,
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