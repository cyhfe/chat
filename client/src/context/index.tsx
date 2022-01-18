import { createContext, ReactNode, useContext } from "react"
import { io, Socket } from "socket.io-client"

const SocketContext = createContext<Socket | null>(null)
if (!process.env.REACT_APP_SOCKET_URL) {
  throw new Error("no socket url")
}
const socket = io(process.env.REACT_APP_SOCKET_URL, {
  autoConnect: false,
})

socket.onAny((event, ...args) => {
  console.log(event, args)
})

export default function SocketProvider({ children }: { children: ReactNode }) {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}

export function useSocket() {
  const socket = useContext(SocketContext)
  if (!socket) {
    throw new Error("need provider")
  }
  return socket
}
