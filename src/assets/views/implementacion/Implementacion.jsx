import { Outlet, useLocation } from "react-router-dom";
import { Box, Typography, Container, Button, Stack } from "@mui/material";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { buttonConfig } from "../../js/bottonConfig.jsx";

const ImplementacionLayout = () => {
  const location = useLocation();
  const currentSection = location.pathname.split("/").pop();
  const currentButtons = buttonConfig[currentSection] || [];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "90%",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1100,
          bgcolor: "primary.light",
          color: "white",
          py: 2,
        }}
      >
        <Container maxWidth="xl">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <WidgetsIcon sx={{ fontSize: 40 }} /> {/* Icono más grande */}
              <Box>
                <Typography variant="h4">Implementación</Typography>
                <Typography variant="subtitle1">
                  Gestión de alianzas, empresas y clientes
                </Typography>
              </Box>
            </Box>
            <Stack direction="row" spacing={2}>
              {currentButtons.map((button) => {
                const { label, ...buttonProps } = button;
                return (
                  <Button
                    key={label}
                    {...buttonProps}
                  >
                    {label}
                  </Button>
                );
              })}
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          boxSizing: "border-box",
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
