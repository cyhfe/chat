import http from "http"
import { Server } from "socket.io"
import app from "./app"
import { users, User, removeFormArray } from "./utils/users"
const httpServer = http.createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
})

io.use((socket, next) => {
  const username = socket.handshake.auth.username
  const password = socket.handshake.auth.password

  if (!username || !password) {
    return next(new Error("用户名或密码不能为空"))
  }

  let user = users.find((user) => user.username === username)

  if (user && user.password !== password) {
    return next(new Error("密码错误"))
  }

  if (!user) {
    user = new User(username, password)
    users.push(user)
  }

  socket.data.user = user

  next()
})

io.on("connection", (socket) => {
  console.log("new socket connect")

  socket.onAny((event, ...args) => {
    console.log(event, args)
  })

  socket.on("join", () => {
    // const me = users.find((user) => user === socket.data.user)
    // if (me) {
    //   me.online = true
    //   socket.emit("me", me)
    //   const friends = users.filter((user) => user.username !== me.username)
    //   socket.emit("friendsChange", friends)
    //   socket.broadcast.emit('friendsChange', )
    // }
    socket.data.user.online = true
    socket.emit("me", socket.data.user)
    io.emit("usersChange", users)
  })

  socket.on("disconnect", () => {
    socket.data.user.online = false
    io.emit("usersChange", users)
    // const me = users.find((user) => user === socket.data.user)
    // if (me) {
    //   me.online = false
    //   const friends = users.filter((user) => user !== me)
    //   socket.broadcast.emit("friendsChange", friends)
    // }
  })

  // users.push({
  //   userID: socket.id,
  //   username: socket.data.username,
  //   online: true,
  // })

  // socket.on("join", () => {
  //   let target = users.findIndex(
  //     (user) => user.username === socket.data.username
  //   )
  //   if (target > -1) {
  //     users.splice(target, 1, {
  //       ...users[target],
  //       online: true,
  //       userID: socket.id,
  //     })
  //   } else {
  //     users.push({
  //       username: socket.data.username,
  //       userID: socket.id,
  //       online: true,
  //     })
  //   }

  //   // socket.emit 只对当前连接用户发送
  //   socket.emit("message", "welcome " + socket.data.username)
  //   socket.broadcast.emit("message", socket.data.username + " join")
  //   io.emit("usersChange", users)
  // })

  // socket.on("message", (msg, user) => {
  //   io.emit("message", msg, user)
  // })

  // socket.on("disconnect", () => {
  //   let target = users.findIndex((user) => user.userID === socket.id)
  //   if (target > -1) {
  //     users.splice(target, 1, {
  //       ...users[target],
  //       online: false,
  //     })
  //   }

  //   users.map((user) => {
  //     console.log(user.userID, socket.id)
  //     return user.userID === socket.id ? { ...user, online: false } : user
  //   })
  //   socket.broadcast.emit("message", socket.data.username + " has left")
  //   io.emit("usersChange", users)
  // })
})

httpServer.listen(4000, () => {
  console.log("listening 4000")
})
