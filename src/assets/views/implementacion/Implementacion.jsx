import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Typography, Container } from "@mui/material";

const ImplementacionLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "90%"
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1100,
          bgcolor: "primary.grey",
          color: "text.Appbar",
          py: 2,
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h4">Implementación</Typography>
          <Typography variant="subtitle1">
            Gestión de alianzas, empresas y clientes
          </Typography>
        </Container>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          boxSizing: "border-box"
        }}
      >
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Outlet />
        </Container>
      </Box>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          bgcolor: "grey.100",
          py: 2,
        }}
      >
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
