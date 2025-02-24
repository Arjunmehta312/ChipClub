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

    const { gameId } = req.body

    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: { players: true },
    })

    if (!game) {
      return res.status(404).json({ message: "Game not found" })
    }

    if (game.players.length >= game.maxPlayers) {
      return res.status(400).json({ message: "Game is full" })
    }

    const updatedGame = await prisma.game.update({
      where: { id: gameId },
      data: {
        players: {
          connect: { id: session.user.id },
        },
      },
      include: { players: true },
    })

    return res.status(200).json(updatedGame)
  } catch (error) {
    console.error("Join game error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
} 