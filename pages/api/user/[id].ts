import { getSession } from "next-auth/react"
import { prisma } from "../../../lib/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const session = await getSession({ req })
    if (!session?.user?.id) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const { id } = req.query

    // Only allow users to fetch their own details
    if (session.user.id !== id) {
      return res.status(403).json({ message: "Forbidden" })
    }

    const user = await prisma.user.findUnique({
      where: { id: id as string },
      select: {
        id: true,
        email: true,
        name: true,
        referralCode: true,
        reputation: true,
        gamesPlayed: true,
        createdAt: true,
        invitedUsers: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
          }
        }
      },
    })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    return res.status(200).json(user)
  } catch (error) {
    console.error("Error fetching user:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
} 