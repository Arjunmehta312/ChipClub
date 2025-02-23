import { Layout } from "../components/layout"
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react"
import { FaChessKing, FaShieldAlt, FaUserCheck } from "react-icons/fa"

export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Find Your Next Poker Game – Exclusive & Trusted</h1>
          <p className="text-xl mb-8">Join the elite community of poker enthusiasts</p>
          <div className="flex justify-center gap-4">
            <Button color="primary" size="lg">
              Sign Up with Referral
            </Button>
            <Button color="secondary" size="lg">
              Explore Games
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader className="flex gap-3">
              <FaChessKing className="w-8 h-8" />
              <div className="flex flex-col">
                <p className="text-md">Trusted Community</p>
              </div>
            </CardHeader>
            <CardBody>
              <p>Join a network of verified players and hosts, ensuring fair and enjoyable games.</p>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="flex gap-3">
              <FaUserCheck className="w-8 h-8" />
              <div className="flex flex-col">
                <p className="text-md">Verified Hosts</p>
              </div>
            </CardHeader>
            <CardBody>
              <p>All game hosts are thoroughly vetted to provide a safe and professional environment.</p>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="flex gap-3">
              <FaShieldAlt className="w-8 h-8" />
              <div className="flex flex-col">
                <p className="text-md">Secure Payments</p>
              </div>
            </CardHeader>
            <CardBody>
              <p>Enjoy peace of mind with our secure payment system and escrow service.</p>
            </CardBody>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

