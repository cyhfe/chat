import http from "http"
import { Server } from "socket.io"
import app from "./app"

const httpServer = http.createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
})

io.on("connection", (socket) => {
  console.log("new socket connect")

  // socket.emit 只对当前连接用户发送
  socket.emit("message", "welcome")

  // socket.broadcast.emit 除了自己，向其他人发送
  socket.broadcast.emit("userConnected", {
    userID: socket.id,
    username: socket.data.username,
  })

  socket.on("sendMessage", (msg) => {
    // io.emit 对所有连接用户
    io.emit("message", msg)
  })

  socket.on("disconnect", () => {
    io.emit("message", "a user has left")
  })
  socket.onAny((event, ...args) => {
    console.log(event, args)
  })
})

httpServer.listen(4000, () => {
  console.log("listening 4000")
})
