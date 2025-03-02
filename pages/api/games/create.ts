import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import { prisma } from "../../../lib/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const session = await getServerSession(req, res, authOptions)
    
    if (!session?.user?.id) {
      return res.status(401).json({ message: "Please log in to create a game" })
    }

    const { title, gameType, buyIn, maxPlayers, location, startTime, description } = req.body

    if (!title || !gameType || !buyIn || !maxPlayers || !location || !startTime) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    const game = await prisma.game.create({
      data: {
        title,
        gameType,
        buyIn: parseFloat(buyIn),
        maxPlayers: parseInt(maxPlayers),
        location,
        startTime: new Date(startTime),
        description: description || null,
        status: "SCHEDULED",
        hostId: session.user.id,
      },
    })

    return res.status(201).json(game)
  } catch (error) {
    console.error("Create game error:", error)
    return res.status(500).json({ 
      message: error instanceof Error ? error.message : "Internal server error" 
    })
  }
} 