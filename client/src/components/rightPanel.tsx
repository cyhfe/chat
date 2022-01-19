import { User } from "../pages/chat"
type RightPanelProps = {
  friends?: User[]
}

export default function Right({ friends }: RightPanelProps) {
  if (!friends) return <div>暂无在线用户</div>
  return (
    <div>
      {friends.map((u) => {
        return (
          <div>
            <p>
              {u.username}({u.online ? "online" : "offline"})
            </p>
          </div>
        )
      })}
    </div>
  )
}
