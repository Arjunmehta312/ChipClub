import { useState } from "react"
import { Input, Button, Select, SelectItem } from "@nextui-org/react"
import { useRouter } from "next/router"

export function HostGameForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    gameType: "",
    buyIn: "",
    maxPlayers: "",
    location: "",
    startTime: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/games/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to create game")
      }

      router.push("/dashboard?tab=my-games")
    } catch (error) {
      console.error("Error creating game:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Game Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <Select
        label="Game Type"
        value={formData.gameType}
        onChange={(e) => setFormData({ ...formData, gameType: e.target.value })}
        required
      >
        <SelectItem value="texas-holdem">Texas Hold'em</SelectItem>
        <SelectItem value="omaha">Omaha</SelectItem>
        <SelectItem value="seven-card-stud">Seven Card Stud</SelectItem>
      </Select>
      {/* Add other form fields */}
      <Button type="submit" color="primary">
        Create Game
      </Button>
    </form>
  )
} 