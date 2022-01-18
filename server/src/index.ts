import http from "http"
import { Server } from "socket.io"
import app from "./app"
import { users } from "./utils/users"
const httpServer = http.createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
})

io.use((socket, next) => {
  const username = socket.handshake.auth.username
  if (!username) {
    return next(new Error("invalid username"))
  }

  if (users.some((user) => user.username === username && user.online)) {
    return next(new Error("用户已在线"))
  }

  socket.data.username = username
  next()
})

io.on("connection", (socket) => {
  console.log("new socket connect")

  // users.push({
  //   userID: socket.id,
  //   username: socket.data.username,
  //   online: true,
  // })

  socket.on("join", () => {
    let target = users.findIndex(
      (user) => user.username === socket.data.username
    )
    if (target > -1) {
      users.splice(target, 1, {
        ...users[target],
        online: true,
        userID: socket.id,
      })
    } else {
      users.push({
        username: socket.data.username,
        userID: socket.id,
        online: true,
      })
    }

    // socket.emit 只对当前连接用户发送
    socket.emit("message", "welcome " + socket.data.username)
    socket.broadcast.emit("message", socket.data.username + " join")
    io.emit("usersChange", users)
  })

  socket.on("message", (msg, user) => {
    io.emit("message", msg, user)
  })

  socket.on("disconnect", () => {
    let target = users.findIndex((user) => user.userID === socket.id)
    if (target > -1) {
      users.splice(target, 1, {
        ...users[target],
        online: false,
      })
    }

    users.map((user) => {
      console.log(user.userID, socket.id)
      return user.userID === socket.id ? { ...user, online: false } : user
    })
    socket.broadcast.emit("message", socket.data.username + " has left")
    io.emit("usersChange", users)
  })

  socket.onAny((event, ...args) => {
    console.log(event, args)
  })
})

httpServer.listen(4000, () => {
  console.log("listening 4000")
})
