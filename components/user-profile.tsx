import { Card, CardBody, Avatar, Button } from "@nextui-org/react"
import { useSession } from "next-auth/react"

export function UserProfile() {
  const { data: session } = useSession()

  return (
    <div className="space-y-6">
      <Card>
        <CardBody className="flex flex-row items-center gap-4">
          <Avatar
            src={session?.user?.image || "https://via.placeholder.com/150"}
            size="lg"
            className="w-24 h-24"
          />
          <div>
            <h2 className="text-xl font-bold">{session?.user?.name || session?.user?.email}</h2>
            <p className="text-gray-500">Member since {new Date().getFullYear()}</p>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <h3 className="text-lg font-semibold mb-4">Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Games Played</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div>
              <p className="text-gray-500">Reputation Score</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <h3 className="text-lg font-semibold mb-4">Your Referral Code</h3>
          <p className="text-xl font-mono bg-gray-100 p-2 rounded">XXXX-XXXX</p>
          <Button className="mt-4" color="primary">
            Copy Code
          </Button>
        </CardBody>
      </Card>
    </div>
  )
} 