import * as React from "react"
import { useSocket } from "../context"

type LoginProps = {
  isConnected: boolean
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Login({ isConnected, setIsConnected }: LoginProps) {
  const [username, setUsername] = React.useState("")
  const socket = useSocket()
  function handleLogin() {
    socket.auth = { username }
    socket.connect()
  }

  React.useEffect(() => {
    console.log("effect listen connect")
    socket.on("connect", () => {
      setIsConnected(true)
    })

    socket.on("connect_error", (err) => {
      // if (err.message === "invalid username") {
      // }
      alert(err.message)
    })
    return () => {
      socket.off("connect")
      socket.off("connect_error")
    }
  }, [socket, setIsConnected])
  return (
    <div>
      <h3>login</h3>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>login</button>
    </div>
  )
}