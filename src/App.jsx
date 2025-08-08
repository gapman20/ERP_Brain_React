import "./App.css";
import MiniDrawer from "./assets/components/MiniDrawer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BrandingSignInPage from "./assets/pages/Login";
import { AppProvider } from "@toolpad/core";
import { ThemeProvider } from "@mui/material/styles";
import customTheme from "./assets/themes/theme";
import Box from "@mui/material/Box";

function App() {
  const appContext = {
    user: {
      id: 32,
      name: "Jose Gabriel Alvarez Perez",
      email: "correo@email",
      role: "admin",
      ip: "192.168.1.1",
    },
    permissions: {
      implementacion: true,
      nominas: true,
      imss: false, // Ejemplo: usuario no tiene acceso a IMSS
      facturacion: true,
      gastos: true,
      utilerias: false,
      soporte: false,
    },
    features: {
      darkMode: false,
      advancedReports: true,
    },
  };

  return (
    <ThemeProvider theme={customTheme}>
      <AppProvider theme={customTheme} value={appContext}>
        <MiniDrawer appContext={appContext} />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
