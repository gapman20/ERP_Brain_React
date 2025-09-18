import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Typography, Container } from "@mui/material";

const ImplementacionLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header específico de Implementación */}
      <Box sx={{ bgcolor: "primary.main", color: "white", py: 2 }}>
        <Container maxWidth="xl">
          <Typography variant="h4">Implementación</Typography>
          <Typography variant="subtitle1">
            Gestión de alianzas, empresas y clientes
          </Typography>
        </Container>
      </Box>
      
      {/* Contenido de la página */}
      <Container maxWidth="xl" sx={{ mt: 3, flexGrow: 1 }}>
        <Outlet />
      </Container>
      
      {/* Footer específico de Implementación */}
      <Box sx={{ position: 'sticky', bottom: 0,zIndex: 10,bgcolor: "grey.100", py: 2, mt: 3, }}>
        <Container maxWidth="xl">
          <Typography variant="body2" color="textSecondary" align="center">
            Módulo de Implementación - Brain ERP
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default ImplementacionLayout;