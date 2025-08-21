import { ThemeProvider } from "./components/ui/theme-provider"
import { Home } from "./pages/Home"

function App() {
  
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
    
  )
}

export default App
