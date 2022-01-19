import ReactDOM from "react-dom"
import App from "./app"
import SocketProvider from "./context/index"
import "./index.css"

const root = document.getElementById("root")

ReactDOM.render(
  <SocketProvider>
    <App />
  </SocketProvider>,
  root
)
