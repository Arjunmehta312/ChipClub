import { Layout } from "../components/layout"
import { Card, CardBody, CardHeader, Button, Input } from "@nextui-org/react"
import { FaStar } from "react-icons/fa"

export default function JoinGame() {
  const games = [
    {
      id: 1,
      host: "John Doe",
      rating: 4.5,
      gameType: "Texas Hold'em",
      buyIn: 100,
      locality: "Downtown",
    },
    {
      id: 2,
      host: "Jane Smith",
      rating: 4.8,
      gameType: "Omaha",
      buyIn: 200,
      locality: "Uptown",
    },
    // Add more game data as needed
  ]

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Join a Game</h1>
        <div className="flex gap-4 mb-6">
          <Input placeholder="Game Type" />
          <Input placeholder="Buy-in Range" />
          <Input placeholder="Locality" />
          <Button color="primary">Filter</Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Card key={game.id}>
              <CardHeader className="flex justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{game.host}</h2>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>{game.rating}</span>
                  </div>
                </div>
                <Button color="primary" size="sm">
                  Join Game
                </Button>
              </CardHeader>
              <CardBody>
                <p>Game: {game.gameType}</p>
                <p>Buy-in: ${game.buyIn}</p>
                <p>Locality: {game.locality}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}

