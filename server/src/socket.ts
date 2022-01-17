import { Server } from "socket.io"
import server from "./index"
const io = new Server(server, {
  cors: {
    origin: "*",
  },
})

io.on("connection", (socket) => {
  console.log("new socket connect")

  // socket.emit 只对当前连接用户发送
  socket.emit("message", "welcome")

  // socket.broadcast.emit 除了自己，向其他人发送
  socket.broadcast.emit("message", "a user connect")

  socket.on("sendMessage", (msg: string) => {
    // io.emit 对所有连接用户
    io.emit("message", msg)
  })

  socket.on("disconnect", () => {
    io.emit("message", "a user has left")
  })
})
