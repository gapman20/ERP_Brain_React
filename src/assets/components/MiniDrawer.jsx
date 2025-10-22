import * as React from "react";
import { useMemo, useCallback } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpIcon from "@mui/icons-material/Help";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Grow, Slide } from "@mui/material";
import MenuList from "./MenuList";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import BrainLogo from "../img/circuito.ico";
import { Outlet } from "react-router-dom";

// Imports refactorizados
import { AppBar, Drawer, DrawerHeader, styles } from "./MiniDrawer/Drawer.styles";
import SectionTitle from "./MiniDrawer/SectionTitle";
import { useUserData } from "./MiniDrawer/hooks/useUserData";
import {
  menuImplementacion,
  menuNominas,
  menuImss,
  menuFacturacion,
  menuGastos,
  menuUtilerias,
  menuSoporte,
} from "./MiniDrawer/menuConfig.jsx";

export default function MiniDrawer() {
  const theme = useTheme();
  const { user, permissions, error, loading } = useUserData();
  const [open, setOpen] = React.useState(true);
  const [expandedSections, setExpandedSections] = React.useState({
    implementacion: false,
    nominas: false,
    imss: false,
    facturacion: false,
    gastos: false,
    utilerias: false,
    soporte: false,
  });

  // Memoize expensive calculations
  const enabledSectionCounts = useMemo(() => {
    return Object.keys(permissions).filter((key) => permissions[key] === true).length;
  }, [permissions]);

  const enabledSections = useMemo(() => {
    return Object.keys(permissions).filter((key) => permissions[key] === true);
  }, [permissions]);

  React.useEffect(() => {
    setExpandedSections((prev) => {
      const newState = {};
      Object.keys(prev).forEach((key) => {
        if (enabledSectionCounts <= 2 && permissions[key]) {
          newState[key] = true;
        } else {
          if (open) {
            newState[key] = permissions[key];
          } else {
            const firstTwoSections = enabledSections.slice(0, 2);
            newState[key] = firstTwoSections.includes(key);
          }
        }
      });
      return newState;
    });
  }, [open, permissions, enabledSectionCounts, enabledSections]);

  // Memoize callbacks to prevent unnecessary re-renders
  const toggleSection = useCallback((section) => {
    if (permissions[section] !== true) {
      return;
    }
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }, [permissions]);

  const toggleDrawer = useCallback(() => {
    setOpen(!open);
  }, [open]);

  // Mostrar estado de carga
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <Typography>Cargando...</Typography>
      </Box>
    );
  }

  // Mostrar error si existe
  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: open
            ? theme.palette.background.secondary
            : theme.palette.primary.main,
          boxShadow: open ? "none" : 6,
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={[
              {
                marginRight: 5,
                color: "inherit",
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            aria-label="close drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={[
              {
                marginRight: 5,
                color: theme.palette.text.Appbar,
              },
              !open && { display: "none" },
            ]}
          >
            <MenuOpenIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              color: open
                ? theme.palette.text.Appbar
                : theme.palette.primary.contrastText,
            }}
          >
            Brain ERP
          </Typography>
          <IconButton
            size="large"
            sx={{ color: open ? theme.palette.text.Appbar : "inherit" }}
          >
            <HelpIcon />
          </IconButton>
          <IconButton
            size="large"
            sx={{ color: open ? theme.palette.text.Appbar : "inherit" }}
          >
            <NotificationsIcon />
          </IconButton>
          <IconButton
            size="large"
            sx={{ color: open ? theme.palette.text.Appbar : "inherit" }}
          >
            <MoreVertIcon />
          </IconButton>
          <IconButton
            size="large"
            aria-label="Cuenta actual del usuario"
            sx={{ color: open ? theme.palette.text.Appbar : "inherit" }}
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#bbb",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#999",
            },
          },
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            boxShadow: 6,
          }}
        >
          <DrawerHeader
            sx={{
              ...styles.body,
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: theme.spacing(1, 2),
              height: "1rem",
              position: "relative",
              overflow: "visible",
              zIndex: 2,
            }}
          >
            {open && (
              <Box
                sx={{
                  textAlign: "center",
                  padding: theme.spacing(1, 0),
                  marginBottom: theme.spacing(1),
                  width: "100%",
                }}
              >
                <Typography variant="caption" color="white">
                  {user.id} | {user.name}
                </Typography>
                <Typography variant="caption" display="block" color="white">
                  {user.email}
                </Typography>
                <Typography variant="caption" display="block" color="white">
                  IP: {user.ip}
                </Typography>
              </Box>
            )}
          </DrawerHeader>

          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "1rem",
              backgroundColor: open ? theme.palette.primary.light : "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: open ? "45px" : "22px",
              overflow: "hidden",
              zIndex: 1,
            }}
          >
            <svg
              viewBox="0 0 500 100"
              preserveAspectRatio="none"
              style={{
                position: "absolute",
                bottom: "0px",
                left: 0,
                width: "100%",
                height: "100px",
                zIndex: 0,
              }}
            >
              <path
                d="M0,35 C125,20 375,95 500,50 L500,100 L0,100 Z"
                style={{ fill: "white" }}
              />
              <path
                d="M0,35 C150,-5 350,85 500,45 L500,100 L0,100 Z"
                style={{ fill: "white", opacity: 0.6 }}
              />
              <path
                d="M0,50 C130,15 370,90 500,50 L500,100 L0,100 Z"
                style={{ fill: "white", opacity: 0.4 }}
              />
              <path
                d="M0,55 C120,25 380,95 500,55 L500,100 L0,100 Z"
                style={{ fill: "white", opacity: 0.2 }}
              />
            </svg>
            <img
              src={BrainLogo}
              alt="Logo de la empresa"
              style={{
                width: open ? "50px" : "30px",
                transition: "width 0.3s ease",
                border: 1,
                position: "relative",
              }}
            />
          </Box>
        </Box>
        {permissions.implementacion && (
          <>
            <Divider />
            <SectionTitle
              open={open}
              onClick={() => toggleSection("implementacion")}
              isExpanded={expandedSections.implementacion}
              disabled={!permissions.implementacion}
            >
              IMPLEMENTACIÓN
            </SectionTitle>
            <Grow
              in={expandedSections.implementacion}
              timeout={180}
              style={{ transformOrigin: "top center" }}
            >
              <Box>
                <Slide
                  direction="up"
                  in={expandedSections.implementacion}
                  timeout={180}
                  style={{ transformOrigin: "top center" }}
                >
                  <Box>
                    {expandedSections.implementacion && (
                      <MenuList
                        menuItems={menuImplementacion}
                        open={open}
                        context={{ permissions, user }}
                        module={"implementacion"}
                      />
                    )}
                  </Box>
                </Slide>
              </Box>
            </Grow>
          </>
        )}
        {permissions.nominas && (
          <>
            <Divider />
            <SectionTitle
              open={open}
              onClick={() => toggleSection("nominas")}
              isExpanded={expandedSections.nominas}
              disabled={!permissions.nominas}
            >
              NÓMINAS
            </SectionTitle>
            <Grow
              in={expandedSections.nominas}
              timeout={180}
              style={{ transformOrigin: "top center" }}
            >
              <Box>
                <Slide
                  direction="up"
                  in={expandedSections.nominas}
                  timeout={180}
                  style={{ transformOrigin: "top center" }}
                >
                  <Box>
                    {expandedSections.nominas && (
                      <MenuList
                        menuItems={menuNominas}
                        open={open}
                        context={{ permissions, user }}
                        module={"nominas"}
                      />
                    )}
                  </Box>
                </Slide>
              </Box>
            </Grow>
          </>
        )}
        {permissions.imss && (
          <>
            <Divider />
            <SectionTitle
              open={open}
              onClick={() => toggleSection("imss")}
              isExpanded={expandedSections.imss}
              disabled={!permissions.imss}
            >
              IMSS
            </SectionTitle>
            <Grow
              in={expandedSections.imss}
              timeout={180}
              style={{ transformOrigin: "top center" }}
            >
              <Box>
                <Slide
                  direction="up"
                  in={expandedSections.imss}
                  timeout={180}
                  style={{ transformOrigin: "top center" }}
                >
                  <Box>
                    {expandedSections.imss && (
                      <MenuList
                        menuItems={menuImss}
                        open={open}
                        context={{ permissions, user }}
                        module={"imss"}
                      />
                    )}
                  </Box>
                </Slide>
              </Box>
            </Grow>
          </>
        )}
        {permissions.facturacion && (
          <>
            <Divider />
            <SectionTitle
              open={open}
              onClick={() => toggleSection("facturacion")}
              isExpanded={expandedSections.facturacion}
              disabled={!permissions.facturacion}
            >
              FACTURACIÓN
            </SectionTitle>
            <Grow
              in={expandedSections.facturacion}
              timeout={180}
              style={{ transformOrigin: "top center" }}
            >
              <Box>
                <Slide
                  direction="up"
                  in={expandedSections.facturacion}
                  timeout={180}
                  style={{ transformOrigin: "top center" }}
                >
                  <Box>
                    {expandedSections.facturacion && (
                      <MenuList
                        menuItems={menuFacturacion}
                        open={open}
                        context={{ permissions, user }}
                        module={"facturacion"}
                      />
                    )}
                  </Box>
                </Slide>
              </Box>
            </Grow>
          </>
        )}
        {permissions.gastos && (
          <>
            <Divider />
            <SectionTitle
              open={open}
              onClick={() => toggleSection("gastos")}
              isExpanded={expandedSections.gastos}
              disabled={!permissions.gastos}
            >
              GASTOS
            </SectionTitle>
            <Grow
              in={expandedSections.gastos}
              timeout={180}
              style={{ transformOrigin: "top center" }}
            >
              <Box>
                <Slide
                  direction="up"
                  in={expandedSections.gastos}
                  timeout={180}
                  style={{ transformOrigin: "top center" }}
                >
                  <Box>
                    {expandedSections.gastos && (
                      <MenuList
                        menuItems={menuGastos}
                        open={open}
                        context={{ permissions, user }}
                        module={"gastos"}
                      />
                    )}
                  </Box>
                </Slide>
              </Box>
            </Grow>
          </>
        )}
        {permissions.utilerias && (
          <>
            <Divider />
            <SectionTitle
              open={open}
              onClick={() => toggleSection("utilerias")}
              isExpanded={expandedSections.utilerias}
              disabled={!permissions.utilerias}
            >
              UTILERIAS
            </SectionTitle>
            <Grow
              in={expandedSections.utilerias}
              timeout={180}
              style={{ transformOrigin: "top center" }}
            >
              <Box>
                <Slide
                  direction="up"
                  in={expandedSections.utilerias}
                  timeout={180}
                  style={{ transformOrigin: "top center" }}
                >
                  <Box>
                    {expandedSections.utilerias && (
                      <MenuList
                        menuItems={menuUtilerias}
                        open={open}
                        context={{ permissions, user }}
                        module={"utilerias"}
                      />
                    )}
                  </Box>
                </Slide>
              </Box>
            </Grow>
          </>
        )}
        {permissions.soporte && (
          <>
            <Divider />
            <SectionTitle
              open={open}
              onClick={() => toggleSection("soporte")}
              isExpanded={expandedSections.soporte}
              disabled={!permissions.soporte}
            >
              SOPORTE
            </SectionTitle>
            <Grow
              in={expandedSections.soporte}
              timeout={180}
              style={{ transformOrigin: "top center" }}
            >
              <Box>
                <Slide
                  direction="up"
                  in={expandedSections.soporte}
                  timeout={180}
                  style={{ transformOrigin: "top center" }}
                >
                  <Box>
                    {expandedSections.soporte && (
                      <MenuList
                        menuItems={menuSoporte}
                        open={open}
                        context={{ permissions, user }}
                        module={"soporte"}
                      />
                    )}
                  </Box>
                </Slide>
              </Box>
            </Grow>
          </>
        )}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          backgroundColor: theme.palette.background.secondary,
        }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
