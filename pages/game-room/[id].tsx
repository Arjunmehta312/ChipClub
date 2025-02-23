import { Input } from "@nextui-org/react"
import { Layout } from "../../components/layout"
import { Card, CardBody, CardHeader, Button, Avatar } from "@nextui-org/react"
import { FaClock, FaComments } from "react-icons/fa"

export default function GameRoomDetails() {
  const gameDetails = {
    id: 1,
    host: "John Doe",
    gameType: "Texas Hold'em",
    buyIn: 100,
    locality: "Downtown",
    maxPlayers: 8,
    registeredPlayers: 5,
    startTime: "2023-06-15T20:00:00Z",
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
                <p>Host: {gameDetails.host}</p>
                <p>Game Type: {gameDetails.gameType}</p>
                <p>Buy-in: ${gameDetails.buyIn}</p>
                <p>Locality: {gameDetails.locality}</p>
                <p>
                  Players: {gameDetails.registeredPlayers}/{gameDetails.maxPlayers}
                </p>
                <div className="flex items-center mt-4">
                  <FaClock className="mr-2" />
                  <p>Starts at: {new Date(gameDetails.startTime).toLocaleString()}</p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Registered Players</h2>
                <div className="flex flex-wrap gap-2">
                  {[...Array(gameDetails.registeredPlayers)].map((_, index) => (
                    <Avatar key={index} name={`Player ${index + 1}`} />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Chat</h2>
              <Card>
                <CardBody className="h-64 overflow-y-auto">{/* Add chat messages here */}</CardBody>
              </Card>
              <div className="flex mt-4">
                <Input placeholder="Type your message..." className="flex-grow mr-2" />
                <Button color="primary">
                  <FaComments className="mr-2" />
                  Send
                </Button>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button color="primary" size="lg">
                Confirm Seat & Pay
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </Layout>
  )
}

