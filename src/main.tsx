import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import theme from './theme'
import './main.css'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>     
    </BrowserRouter>
  </StrictMode>
)
