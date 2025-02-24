import { Card, CardBody, Button, Chip } from "@nextui-org/react"
import { useState } from "react"

export function MyGames() {
  const [activeTab, setActiveTab] = useState("upcoming")

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-6">
        <Button
          color={activeTab === "upcoming" ? "primary" : "default"}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Games
        </Button>
        <Button
          color={activeTab === "past" ? "primary" : "default"}
          onClick={() => setActiveTab("past")}
        >
          Past Games
        </Button>
      </div>

      {/* Placeholder for when no games are found */}
      <Card>
        <CardBody className="text-center py-8">
          <p className="text-gray-500 mb-4">
            {activeTab === "upcoming"
              ? "You haven't joined any upcoming games yet."
              : "No past games found."}
          </p>
          <Button color="primary" href="/dashboard?tab=find-games" as="a">
            Find Games to Join
          </Button>
        </CardBody>
      </Card>

      {/* This will be populated with actual games later */}
      {/* Example game card: */}
      <Card className="hidden">
        <CardBody>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">Texas Hold'em</h3>
              <p className="text-gray-500">Hosted by John Doe</p>
              <p className="text-sm">Buy-in: $50</p>
              <p className="text-sm">Location: Downtown</p>
            </div>
            <Chip color="primary">Upcoming</Chip>
          </div>
        </CardBody>
      </Card>
    </div>
  )
} 