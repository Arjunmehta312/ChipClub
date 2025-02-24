import { getSession } from "next-auth/react"
import { prisma } from "../../../lib/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const session = await getSession({ req })
    if (!session?.user?.id) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const { title, gameType, buyIn, maxPlayers, location, startTime } = req.body

    const game = await prisma.game.create({
      data: {
        title,
        gameType,
        buyIn: parseFloat(buyIn),
        maxPlayers: parseInt(maxPlayers),
        location,
        startTime: new Date(startTime),
        hostId: session.user.id,
      },
    })

    return res.status(201).json(game)
  } catch (error) {
    console.error("Create game error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
} 