import LeftPanel from "../components/leftPanel"
import RightPanel from "../components/rightPanel"
import Main from "../components/main"
import { Row, Col } from "antd"
import { useEffect, useState } from "react"
import { useSocket } from "../context"

export type User = {
  username: string
  password: string
  online: boolean
  rooms: []
}

export default function Chat() {
  const [users, setUsers] = useState<User[] | null>(null)
  const [me, setMe] = useState<User | null>(null)
  const socket = useSocket()

  const friends = users?.filter((user) => user.username !== me?.username)

  useEffect(() => {
    socket.emit("join")

    socket.on("me", (me) => {
      setMe(me)
    })

    socket.on("usersChange", (users) => {
      setUsers(users)
    })

    return () => {
      socket.off("join")
    }
  }, [socket])

  return (
    <Row>
      <Col span={24}>username: {me?.username}</Col>
      <Col span={8}>
        <LeftPanel />
      </Col>
      <Col span={8}>
        <Main />
      </Col>
      <Col span={8}>
        <RightPanel friends={friends} />
      </Col>
    </Row>
  )
}
