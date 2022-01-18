import Login from "./components/login"
import Chat from "./components/chat"
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
