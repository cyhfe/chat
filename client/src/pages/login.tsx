import * as React from "react"
import { useSocket } from "../context"

type LoginProps = {
  isConnected: boolean
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Login({ isConnected, setIsConnected }: LoginProps) {
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [err, setError] = React.useState("")
  const socket = useSocket()
  function handleLogin() {
    socket.auth = { username, password }
    socket.connect()
  }

  React.useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true)
    })

    socket.on("connect_error", (err) => {
      setError(err.message)
    })

    return () => {
      socket.off("connect")
      socket.off("connect_error")
    }
  }, [socket, setIsConnected])
  return (
    <div>
      <h3>login</h3>
      {err ? <p style={{ color: "red" }}>{err}</p> : null}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>login</button>
    </div>
  )
}
