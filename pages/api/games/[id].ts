import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import { prisma } from "../../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const session = await getServerSession(req, res, authOptions)
    
    if (!session?.user?.id) {
      return res.status(401).json({ message: "Please login to view game details" })
    }

    const { id } = req.query

    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Valid game ID is required" })
    }

    const game = await prisma.game.findUnique({
      where: { id },
      include: {
        host: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        players: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        gamePlayers: true
      }
    })

    if (!game) {
      return res.status(404).json({ message: "Game not found" })
    }

    return res.status(200).json(game)
  } catch (error) {
    console.error("Fetch game error:", error)
    return res.status(500).json({ 
      message: error instanceof Error ? error.message : "Failed to fetch game details" 
    })
  }
}