import './App.css'
import MiniDrawer from './assets/components/MiniDrawer'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BrandingSignInPage from './assets/pages/Login';
import { AppProvider } from '@toolpad/core'
import { ThemeProvider } from '@mui/material/styles'
import customTheme from './assets/themes/theme'
import Box from "@mui/material/Box";


function App() {

  return (
    <ThemeProvider theme={customTheme}>
      <AppProvider theme={customTheme}>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<BrandingSignInPage/>}/>
            <Route path ='/*' element={
              <Box sx={{display: 'flex'}}>
                <MiniDrawer/>
              </Box>
            }/>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  )
}

export default App
