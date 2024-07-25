import { createRoot } from "react-dom/client"
import TestMain from "./app/Main"

const container = document.getElementById("app")
const root = createRoot(container)
root.render(<TestMain />)
