import './App.css'
import MiniDrawer from './assets/components/MiniDrawer'
import { AppProvider } from '@toolpad/core'
import { ThemeProvider } from '@mui/material/styles'
import customTheme from './assets/themes/theme'

function App() {

  return (
    <ThemeProvider theme={customTheme}>
      <AppProvider theme={customTheme}>
      <MiniDrawer />
      </AppProvider>
    </ThemeProvider>
  )
}

export default App
