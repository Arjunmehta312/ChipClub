import { useState, useEffect } from "react"
import { Card, CardBody, Button, Input } from "@nextui-org/react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"; // Add this import at the top

interface Game {
  id: string
  title: string
  gameType: string
  buyIn: number
  maxPlayers: number
  location: string
  startTime: string
  players: any[]
}

export function GameList() {
  const { data: session } = useSession(); // Add this near the top of your component
  const [games, setGames] = useState<Game[]>([])
  const [joiningGame, setJoiningGame] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const [filters, setFilters] = useState({
    gameType: "",
    buyIn: "",
    location: "",
  })

  useEffect(() => {
    fetchGames()
  }, [filters])

  const fetchGames = async () => {
    try {
      const queryParams = new URLSearchParams(filters)
      const response = await fetch(`/api/games/list?${queryParams}`)
      const data = await response.json()
      setGames(data)
    } catch (error) {
      console.error("Error fetching games:", error)
    }
  }

  const handleJoinGame = async (gameId: string) => {
    try {
      setJoiningGame(gameId)
      setError(null)
      
      // First, check if the user has already joined this game
      const checkResponse = await fetch(`/api/games/${gameId}`)
      
      if (!checkResponse.ok) {
        throw new Error("Failed to check game membership")
      }
      
      const gameData = await checkResponse.json()
      const userHasJoined = gameData.gamePlayers.some(
        player => player.playerId === session?.user?.id  // Now session is defined
      )
      
      // If already joined, just redirect to game room
      if (userHasJoined) {
        router.push(`/game-room/${gameId}`)
        return
      }
      
      // Otherwise proceed with joining
      const joinResponse = await fetch("/api/games/join", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ gameId })
      })
      
      if (!joinResponse.ok) {
        const errorData = await joinResponse.json()
        throw new Error(errorData.message || "Failed to join game")
      }
      
      // On successful join, redirect to game room
      router.push(`/game-room/${gameId}`)
    } catch (error) {
      console.error("Error joining game:", error)
      setError(error instanceof Error ? error.message : "Failed to join game")
    } finally {
      setJoiningGame(null)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="grid grid-cols-3 gap-4">
        {/* Add filter inputs */}
      </div>

      {/* Game listings */}
      {games.map((game) => (
        <Card key={game.id}>
          <CardBody>
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold">{game.title}</h3>
                <p>{game.gameType}</p>
                <p>Buy-in: ${game.buyIn}</p>
                <p>
                  Players: {game.players.length}/{game.maxPlayers}
                </p>
              </div>
              <Button
                color="primary"
                onClick={() => handleJoinGame(game.id)}
                isLoading={joiningGame === game.id}
                isDisabled={joiningGame !== null || game.players.length >= game.maxPlayers}
              >
                {joiningGame === game.id ? "Joining..." : "Join Game"}
              </Button>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}