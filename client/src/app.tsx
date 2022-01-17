import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react"
import { useSocket } from "./context"

export default function App() {
  const [message, setMessage] = useState("")
  const socket = useSocket()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setMessage(e.target.value)
  }

  const handleSubmit: MouseEventHandler = (e) => {
    e.preventDefault()
    socket.emit("sendMessage", message)
    setMessage("")
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id) // x8WIv7-mJelg7on_ALbx
    })

    socket.on("disconnect", () => {
      console.log(socket.id) // undefined
    })

    socket.on("message", (msg: string) => {
      console.log(msg) // x8WIv7-mJelg7on_ALbx
    })
  }, [socket])

  return (
    <div>
      <form>
        <input type="text" value={message} onChange={handleInputChange} />
        <button onClick={handleSubmit}>type</button>
      </form>
    </div>
  )
}
