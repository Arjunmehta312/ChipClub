import { Layout } from "../../components/layout"
import { Card, CardHeader, CardBody, Button, Avatar, Textarea } from "@nextui-org/react"
import { FaClock } from "react-icons/fa"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

export default function GameRoomDetails() {
  const router = useRouter()
  const { id } = router.query
  const { data: session } = useSession()
  const [gameDetails, setGameDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Only fetch when we have an ID from the route
    if (!id) return

    async function fetchGameDetails() {
      try {
        setLoading(true)
        const response = await fetch(`/api/games/${id}`)
        
        if (!response.ok) {
          throw new Error("Failed to fetch game details")
        }
        
        const data = await response.json()
        setGameDetails(data)
      } catch (err) {
        console.error("Error fetching game details:", err)
        setError("Could not load game details")
      } finally {
        setLoading(false)
      }
    }

    fetchGameDetails()
  }, [id])

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardBody>
              <div className="flex justify-center">
                <p>Loading game details...</p>
              </div>
            </CardBody>
          </Card>
        </div>
      </Layout>
    )
  }

  if (error || !gameDetails) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardBody>
              <div className="flex flex-col items-center">
                <p className="text-red-500 mb-4">{error || "Game not found"}</p>
                <Button color="primary" onClick={() => router.push("/dashboard?tab=find-games")}>
                  Back to Game List
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <h1 className="text-2xl font-bold">Game Room Details</h1>
          </CardHeader>
          <CardBody>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Game Information</h2>
                <p className="text-lg font-semibold">{gameDetails.title}</p>
                <p className="text-gray-500 mb-2">Hosted by {gameDetails.host?.name || "Unknown Host"}</p>
                <p>Game Type: {gameDetails.gameType || "Not specified"}</p>
                <p>Buy-in: ${gameDetails.buyIn}</p>
                <p>Location: {gameDetails.location}</p>
                <p>
                  Players: {gameDetails.players?.length || 0}/{gameDetails.maxPlayers}
                </p>
                <div className="flex items-center mt-4">
                  <FaClock className="mr-2" />
                  <p>Starts at: {new Date(gameDetails.startTime).toLocaleString()}</p>
                </div>
                {gameDetails.description && (
                  <div className="mt-4">
                    <h3 className="font-medium">Description:</h3>
                    <p className="text-sm">{gameDetails.description}</p>
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Registered Players</h2>
                <div className="flex flex-wrap gap-2">
                  {gameDetails.players?.length > 0 ? (
                    gameDetails.players.map((player, index) => (
                      <Avatar 
                        key={player.id || index} 
                        name={player.name || `Player ${index + 1}`}
                        src={player.image || undefined}
                      />
                    ))
                  ) : (
                    <p className="text-gray-500">No players have joined yet</p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Chat</h2>
              <Card>
                <CardBody>
                  <div className="h-64 mb-4 bg-gray-100 rounded p-2 overflow-y-auto">
                    <p className="text-gray-500 text-center">Chat will be available soon</p>
                  </div>
                  <div className="flex gap-2">
                    <Textarea 
                      placeholder="Type a message..." 
                      className="flex-grow"
                      disabled
                    />
                    <Button color="primary" disabled>Send</Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </CardBody>
        </Card>
      </div>
    </Layout>
  )
}

