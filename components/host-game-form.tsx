import { useState } from "react"
import { Input, Button, Select, SelectItem, Textarea } from "@nextui-org/react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

export function HostGameForm() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    gameType: "",
    buyIn: "",
    maxPlayers: "",
    location: "",
    startTime: "",
    description: ""
  })

  if (status === "unauthenticated") {
    router.push("/login?callbackUrl=/dashboard?tab=host-game")
    return null
  }

  const validateForm = () => {
    if (!formData.title.trim()) return "Game title is required"
    if (!formData.gameType) return "Game type is required"
    if (!formData.buyIn || parseFloat(formData.buyIn) <= 0) return "Valid buy-in amount is required"
    if (!formData.maxPlayers || parseInt(formData.maxPlayers) < 2) return "At least 2 players required"
    if (!formData.location.trim()) return "Location is required"
    if (!formData.startTime) return "Start time is required"
    
    const startTime = new Date(formData.startTime)
    if (startTime < new Date()) return "Start time must be in the future"
    
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (!session?.user?.id) {
        router.push('/login?callbackUrl=/dashboard?tab=host-game')
        return
      }

      const validationError = validateForm()
      if (validationError) {
        setError(validationError)
        setIsLoading(false)
        return
      }

      const response = await fetch("/api/games/create", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          buyIn: parseFloat(formData.buyIn),
          maxPlayers: parseInt(formData.maxPlayers),
          startTime: new Date(formData.startTime).toISOString(),
          description: formData.description.trim() || null
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login?callbackUrl=/dashboard?tab=host-game')
          return
        }
        throw new Error(data.message || "Failed to create game")
      }

      router.push("/dashboard?tab=my-games")
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to create game")
      console.error("Error creating game:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="text-red-500 text-sm mb-4 p-3 bg-red-50 rounded-lg">
          {error}
        </div>
      )}
      
      <Input
        label="Game Title"
        placeholder="Enter a title for your game"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        isRequired
        isDisabled={isLoading}
      />

      <Select
        label="Game Type"
        placeholder="Select game type"
        value={formData.gameType}
        onChange={(e) => setFormData({ ...formData, gameType: e.target.value })}
        isRequired
        isDisabled={isLoading}
      >
        <SelectItem key="texas-holdem" value="texas-holdem">Texas Hold'em</SelectItem>
        <SelectItem key="omaha" value="omaha">Omaha</SelectItem>
        <SelectItem key="seven-card-stud" value="seven-card-stud">Seven Card Stud</SelectItem>
      </Select>

      <Input
        label="Buy-in Amount ($)"
        type="number"
        min="0"
        step="0.01"
        placeholder="Enter buy-in amount"
        value={formData.buyIn}
        onChange={(e) => setFormData({ ...formData, buyIn: e.target.value })}
        isRequired
        isDisabled={isLoading}
      />

      <Input
        label="Maximum Players"
        type="number"
        min="2"
        max="10"
        placeholder="Enter max players"
        value={formData.maxPlayers}
        onChange={(e) => setFormData({ ...formData, maxPlayers: e.target.value })}
        isRequired
        isDisabled={isLoading}
      />

      <Input
        label="Location"
        placeholder="Enter game location"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        isRequired
        isDisabled={isLoading}
      />

      <Input
        label="Start Time"
        type="datetime-local"
        value={formData.startTime}
        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
        isRequired
        isDisabled={isLoading}
        min={new Date().toISOString().slice(0, 16)}
      />

      <Textarea
        label="Description (Optional)"
        placeholder="Enter game description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        isDisabled={isLoading}
      />

      <Button 
        type="submit" 
        color="primary" 
        className="w-full"
        isLoading={isLoading}
        isDisabled={isLoading}
      >
        {isLoading ? "Creating Game..." : "Create Game"}
      </Button>
    </form>
  )
} 