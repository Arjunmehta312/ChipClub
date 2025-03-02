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
      return res.status(401).json({ message: "Please login to join games" })
    }

    const { gameId } = req.body
    console.log("Received gameId:", gameId)

    if (!gameId) {
      return res.status(400).json({ message: "Game ID is required" })
    }

    // Check if the game exists
    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: {
        host: true,
        players: true,
        gamePlayers: {
          where: {
            playerId: session.user.id
          }
        }
      }
    })

    if (!game) {
      return res.status(404).json({ message: "Game not found" })
    }

    // Check if user already joined
    const existingMembership = await prisma.gamePlayer.findFirst({
      where: {
        gameId,
        playerId: session.user.id
      }
    })

    // If already joined, return success with a message
    if (existingMembership) {
      return res.status(200).json({ 
        message: "Already a member of this game",
        alreadyJoined: true,
        gameId
      })
    }

    // Check if already joined
    if (game.gamePlayers.length > 0) {
      return res.status(400).json({ message: "You have already joined this game" })
    }

    // Check if game is full
    if (game.players.length >= game.maxPlayers) {
      return res.status(400).json({ message: "This game is already full" })
    }

    // Add player to the game
    await prisma.gamePlayer.create({
      data: {
        gameId,
        playerId: session.user.id,
        status: "PENDING",
      }
    })

    // Update the game's players list
    const updatedGame = await prisma.game.update({
      where: { id: gameId },
      data: {
        players: {
          connect: { id: session.user.id }
        }
      },
      include: {
        host: true,
        players: true
      }
    })

    return res.status(200).json({ 
      success: true, 
      game: updatedGame 
    })
  } catch (error) {
    console.error("Error joining game:", error)
    return res.status(500).json({ 
      message: error instanceof Error ? error.message : "Failed to join game" 
    })
  }
}