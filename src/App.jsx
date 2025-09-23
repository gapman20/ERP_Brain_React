import "./App.css";
import React from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import MiniDrawer from "./assets/components/MiniDrawer";
import { ThemeProvider } from "@mui/material/styles";
import customTheme from "./assets/themes/theme";
import AlianzasPage from "./assets/pages/Alianzas/Alianzas";
import ImplementacionLayout from "./assets/views/implementacion/Implementacion.jsx";
import { useState } from "react";


export const AppContext = React.createContext();

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
        <Router>
          <Routes>
            <Route path="/" element={<MiniDrawer />}>
              <Route path="implementacion/*" element={<ImplementacionLayout />}>
                <Route path="alianzas" element ={<AlianzasPage/>}/>
              </Route>
            </Route>
          </Routes>
        </Router>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
