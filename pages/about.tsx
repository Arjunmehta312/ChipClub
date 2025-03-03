import { Layout } from "../components/layout"
import { Card, CardBody } from "@nextui-org/react"
import { FaGithub } from "react-icons/fa"

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About ChipClub</h1>
          <p className="text-xl text-gray-600">Your Premium Poker Community Platform</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardBody>
              <h2 className="text-2xl font-bold mb-4">Current Features</h2>
              <ul className="space-y-3 list-disc list-inside">
                <li>Exclusive invite-only membership system</li>
                <li>Secure user authentication</li>
                <li>Personal referral code system</li>
                <li>User profiles with gaming statistics</li>
                <li>Game hosting capabilities</li>
                <li>Reputation tracking system</li>
              </ul>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
              <ul className="space-y-3 list-disc list-inside">
                <li>In-app messaging system</li>
                <li>Live game tracking</li>
                <li>Tournament organization tools</li>
                <li>Advanced player statistics</li>
                <li>Mobile application</li>
                <li>Virtual chips management</li>
              </ul>
            </CardBody>
          </Card>
        </div>

        <Card className="mb-8">
          <CardBody>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg">
              ChipClub aims to create a trusted community of poker enthusiasts where players can safely organize games, 
              track their progress, and connect with fellow players. We're committed to providing a secure and enjoyable 
              platform for both casual and serious players.
            </p>
          </CardBody>
        </Card>

        <div className="text-center text-gray-600 text-sm">
          <div className="flex items-center justify-center gap-2">
            <span>Developed by Arjun</span>
            <a
              href="https://github.com/Arjunmehta312"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
            >
              <FaGithub size={20} />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}
