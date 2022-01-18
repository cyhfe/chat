import http from "http"
import { Server } from "socket.io"
import app from "./app"

const httpServer = http.createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
})

io.use((socket, next) => {
  const username = socket.handshake.auth.username
  console.log(username)
  if (!username) {
    return next(new Error("invalid username"))
  }
  socket.data.username = username
  next()
})

type User = {
  userID: string
  username: string
}

const users: User[] = []

io.on("connection", (socket) => {
  console.log("new socket connect")

  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.data.username,
    })
  }

  socket.on("join", () => {
    socket.emit("users", users)

    // socket.emit 只对当前连接用户发送
    socket.emit("message", "welcome " + socket.data.username)
  })

  socket.on("message", (msg, user) => {
    io.emit("message", msg, user)
  })

  // socket.broadcast.emit 除了自己，向其他人发送
  socket.broadcast.emit("userConnected", {
    userID: socket.id,
    username: socket.data.username,
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
