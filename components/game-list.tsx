import { Button, Input } from "@nextui-org/react"
import { useState } from "react"
import { useRouter } from "next/router"

export function GameList() {
  const [filters, setFilters] = useState({
    gameType: "",
    buyIn: "",
    locality: "",
  })
  const router = useRouter()

  const handleFilterChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, [key]: e.target.value }))
  }

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Game Type"
          value={filters.gameType}
          onChange={handleFilterChange("gameType")}
        />
        <Input
          placeholder="Buy-in Range"
          value={filters.buyIn}
          onChange={handleFilterChange("buyIn")}
        />
        <Input
          placeholder="Locality"
          value={filters.locality}
          onChange={handleFilterChange("locality")}
        />
        <Button color="primary">Search</Button>
      </div>
      <Button 
        color="secondary" 
        className="w-full"
        onClick={() => router.push("/host-game")}
      >
        Host a New Game
      </Button>
    </div>
  )
} 