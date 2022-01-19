import Login from "./pages/login"
import Chat from "./pages/chat"
import { useState } from "react"
export default function App() {
  const [isConnected, setIsConnected] = useState(false)
  return (
    <div>
      {isConnected ? (
        <Chat />
      ) : (
        <Login isConnected={isConnected} setIsConnected={setIsConnected} />
      )}
    </div>
  )
}
