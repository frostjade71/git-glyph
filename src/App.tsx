import DemoPage from './pages/DemoPage'
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <>
      <DemoPage />
      <Analytics />
    </>
  )
}

export default App
