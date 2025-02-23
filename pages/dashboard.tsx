import { Layout } from "../components/layout"
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react"
import { FaSearch, FaGamepad, FaUser, FaWallet } from "react-icons/fa"

export default function Dashboard() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Welcome to ChipClub</h1>
        <Tabs aria-label="Dashboard tabs" color="primary" variant="underlined">
          <Tab
            key="find-games"
            title={
              <div className="flex items-center space-x-2">
                <FaSearch />
                <span>Find Games</span>
              </div>
            }
          >
            <Card>
              <CardBody>
                <h2 className="text-xl font-semibold mb-4">Available Games</h2>
                {/* Add game list component here */}
              </CardBody>
            </Card>
          </Tab>
          <Tab
            key="my-games"
            title={
              <div className="flex items-center space-x-2">
                <FaGamepad />
                <span>My Games</span>
              </div>
            }
          >
            <Card>
              <CardBody>
                <h2 className="text-xl font-semibold mb-4">Your Games</h2>
                {/* Add user's games component here */}
              </CardBody>
            </Card>
          </Tab>
          <Tab
            key="profile"
            title={
              <div className="flex items-center space-x-2">
                <FaUser />
                <span>Profile & Reputation</span>
              </div>
            }
          >
            <Card>
              <CardBody>
                <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
                {/* Add profile component here */}
              </CardBody>
            </Card>
          </Tab>
          <Tab
            key="wallet"
            title={
              <div className="flex items-center space-x-2">
                <FaWallet />
                <span>Wallet & Payments</span>
              </div>
            }
          >
            <Card>
              <CardBody>
                <h2 className="text-xl font-semibold mb-4">Your Wallet</h2>
                {/* Add wallet component here */}
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </Layout>
  )
}

