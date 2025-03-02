import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import { prisma } from "../../../lib/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const session = await getServerSession(req, res, authOptions)
    if (!session?.user?.id) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const { gameType, buyIn, location } = req.query

    const games = await prisma.game.findMany({
      where: {
        AND: [
          gameType ? { gameType: gameType as string } : {},
          buyIn ? { buyIn: parseFloat(buyIn as string) } : {},
          location ? { location: { contains: location as string } } : {},
          { status: "SCHEDULED" },
          { startTime: { gte: new Date() } }
        ]
      },
      include: {
        host: {
          select: {
            id: true,
            name: true,
            reputation: true
          }
        },
        players: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        startTime: 'asc'
      }
    })

    return res.status(200).json(games)
  } catch (error) {
    console.error("List games error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
} 