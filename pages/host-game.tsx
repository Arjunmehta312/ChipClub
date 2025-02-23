import { Layout } from "../components/layout"
import { Button, Input, Select, SelectItem, Switch, Textarea, Card, CardBody, CardHeader } from "@nextui-org/react"

export default function HostGame() {
  const gameTypes = [
    { label: "Texas Hold'em", value: "texas-holdem" },
    { label: "Omaha", value: "omaha" },
    { label: "Seven-Card Stud", value: "seven-card-stud" },
  ]

  const localities = [
    { label: "Downtown", value: "downtown" },
    { label: "Uptown", value: "uptown" },
    { label: "Midtown", value: "midtown" },
  ]

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <h1 className="text-2xl font-bold">Host a Game</h1>
          </CardHeader>
          <CardBody>
            <form className="space-y-6">
              <Select label="Game Type" placeholder="Select game type">
                {gameTypes.map((game) => (
                  <SelectItem key={game.value} value={game.value}>
                    {game.label}
                  </SelectItem>
                ))}
              </Select>

              <Select label="Locality" placeholder="Select locality">
                {localities.map((locality) => (
                  <SelectItem key={locality.value} value={locality.value}>
                    {locality.label}
                  </SelectItem>
                ))}
              </Select>

              <Input label="Buy-in Amount" placeholder="Enter buy-in amount" type="number" />

              <Input label="Max Players" placeholder="Enter maximum number of players" type="number" />

              <Switch defaultSelected>Age Restriction (21+)</Switch>

              <Textarea
                label="Special Instructions"
                placeholder="Enter any special instructions or rules for the game"
              />

              <Button color="primary" size="lg">
                Create Game
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </Layout>
  )
}

