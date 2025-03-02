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

    // Transaction to ensure atomicity
    const result = await prisma.$transaction(async (tx) => {
      const game = await tx.game.findUnique({
        where: { id: gameId },
        include: {
          players: true,
          gamePlayers: {
            where: { playerId: session.user.id }
          }
        },
      })

      if (!game) {
        throw new Error("Game not found")
      }

      if (game.status !== "SCHEDULED") {
        throw new Error("Game is not accepting players")
      }

      if (game.players.length >= game.maxPlayers) {
        throw new Error("Game is full")
      }

      if (game.gamePlayers.length > 0) {
        throw new Error("Already joined this game")
      }

      // Create GamePlayer entry
      const gamePlayer = await tx.gamePlayer.create({
        data: {
          gameId,
          playerId: session.user.id,
          status: "PENDING"
        }
      })

      // Connect player to game
      const updatedGame = await tx.game.update({
        where: { id: gameId },
        data: {
          players: {
            connect: { id: session.user.id },
          },
        },
        include: { 
          players: true,
          gamePlayers: true
        },
      })

      return { game: updatedGame, gamePlayer }
    })

    return res.status(200).json(result)
  } catch (error) {
    console.error("Join game error:", error)
    return res.status(400).json({ 
      message: error instanceof Error ? error.message : "Failed to join game" 
    })
  }
}