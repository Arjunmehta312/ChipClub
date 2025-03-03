import { prisma } from "@/lib/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const { referralCode } = req.body

    if (!referralCode) {
      return res.status(400).json({ message: "Referral code is required" })
    }

    // Check if referral code exists
    const referrer = await prisma.user.findFirst({
      where: { referralCode },
    })

    if (!referrer) {
      return res.status(404).json({ message: "Invalid referral code" })
    }

    return res.status(200).json({ valid: true })
  } catch (error) {
    console.error("Verify referral error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}