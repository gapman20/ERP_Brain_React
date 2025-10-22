import "./App.css";
import { useState } from "react";
import { MemoryRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MiniDrawer from "./assets/components/MiniDrawer";
import { ThemeProvider } from "@mui/material/styles";
import customTheme from "./assets/themes/theme";
import AlianzasPage from "./assets/pages/Alianzas/Alianzas";
import ImplementacionLayout from "./assets/views/implementacion/Implementacion.jsx";
import Login from "./assets/pages/Login/Login";
import ProtectedRoute from "./assets/components/ProtectedRoute";
import { AppContext } from "./context/AppContext";

function App() {
  const [currentModule, setCurrentModule] = useState("implementacion");
  const [currentSection, setCurrentSection] = useState("alianzas");

  return (
    <ThemeProvider theme={customTheme}>
      <AppContext.Provider
        value={{
          currentModule,
          setCurrentModule,
          currentSection,
          setCurrentSection,
        }}
      >
        <Router initialEntries={['/login']} initialIndex={0}>
          <Routes>
            {/* Ruta de Login (pública) */}
            <Route path="/login" element={<Login />} />

            {/* Redirigir raíz a login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Rutas protegidas del sistema */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <MiniDrawer />
                </ProtectedRoute>
              }
            >
              <Route path="implementacion/*" element={<ImplementacionLayout />}>
                <Route path="alianzas" element={<AlianzasPage />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
