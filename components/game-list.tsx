import { useEffect, useState } from "react"
import { Card, CardBody, Button, Input } from "@nextui-org/react"

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
  const [games, setGames] = useState<Game[]>([])
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
      const response = await fetch("/api/games/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId }),
      })

      if (!response.ok) {
        throw new Error("Failed to join game")
      }

      fetchGames() // Refresh the list
    } catch (error) {
      console.error("Error joining game:", error)
    }
  }

  return (
    <div className="space-y-6">
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
                disabled={game.players.length >= game.maxPlayers}
              >
                Join Game
              </Button>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  )
} 