import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import NavBar from './Components/NavBar'
import { ThemeContextProvider } from "./context/themeContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContextProvider>
      <NavBar />
    </ThemeContextProvider>
  </StrictMode>,
)
