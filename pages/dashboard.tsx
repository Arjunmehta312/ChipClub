import { Layout } from "../components/layout"
import { Card, CardBody, Tab, Tabs, Button, Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react"
import { FaSearch, FaGamepad, FaUser, FaWallet } from "react-icons/fa"
import { withAuth } from "../components/protected-route"
import { useState } from "react"
import { GameList } from "../components/game-list"
import { UserProfile } from "../components/user-profile"
import { MyGames } from "../components/my-games"
import { HostGameForm } from "../components/host-game-form"

function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("find-games")
  const [showHostForm, setShowHostForm] = useState(false)

  const renderTabContent = () => {
    switch (selectedTab) {
      case "find-games":
        return <GameList />
      case "my-games":
        return <MyGames />
      case "profile":
        return <UserProfile />
      default:
        return null
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Welcome to ChipClub</h1>
        <div className="flex justify-end mb-6">
          <Button 
            color="primary"
            onPress={() => setShowHostForm(true)}
          >
            Host New Game
          </Button>
        </div>
        <Tabs 
          aria-label="Dashboard tabs" 
          color="primary" 
          variant="underlined"
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key as string)}
        >
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
              <CardBody>{renderTabContent()}</CardBody>
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
              <CardBody>{renderTabContent()}</CardBody>
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
              <CardBody>{renderTabContent()}</CardBody>
            </Card>
          </Tab>
        </Tabs>
        {showHostForm && (
          <Modal
            isOpen={showHostForm}
            onClose={() => setShowHostForm(false)}
            size="2xl"
          >
            <ModalContent>
              <ModalHeader>Host a New Game</ModalHeader>
              <ModalBody>
                <HostGameForm />
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </div>
    </Layout>
  )
}

export default withAuth(Dashboard)

