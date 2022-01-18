import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react"
import { useSocket } from "../context"

type User = {
  userId: string
  username: string
}

export default function Chat() {
  const [message, setMessage] = useState<string[]>([])
  const [input, setInput] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const socket = useSocket()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setInput(e.target.value)
  }

  const handleSubmit: MouseEventHandler = (e) => {
    e.preventDefault()
    socket.emit("message", input)
    setInput("")
  }

  useEffect(() => {
    console.log("chat effect")
    socket.emit("join")
    socket.on("message", (msg: string) => {
      setMessage((prev) => prev.concat(msg))
    })

    socket.on("users", (users) => {
      console.log(users)
      setUsers(users)
    })

    socket.onAny((event, ...args) => {
      console.log(event, args)
    })

    return () => {
      console.log("clear")
      socket.off("message")
      socket.off("users")
    }
  }, [socket])

  return (
    <div>
      <h3>chat</h3>
      <div style={{ border: "1px solid" }}>
        <h5>users</h5>
        {users.map((user, i) => {
          return <p key={i}>{user.username}</p>
        })}
      </div>
      <div style={{ border: "1px solid" }}>
        <h5>messages</h5>
        {message.map((m, i) => {
          return <p key={i}>{m}</p>
        })}
      </div>
      <form>
        <input type="text" value={input} onChange={handleInputChange} />
        <button onClick={handleSubmit}>type</button>
      </form>
    </div>
  )
}
