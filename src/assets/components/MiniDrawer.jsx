import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import DescriptionIcon from "@mui/icons-material/Description";
import HandshakeIcon from "@mui/icons-material/Handshake";
import PaymentsIcon from "@mui/icons-material/Payments";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import ArticleIcon from "@mui/icons-material/Article";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import FactoryIcon from "@mui/icons-material/Factory";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpIcon from "@mui/icons-material/Help";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grow, Slide } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import MenuList from "./MenuList";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { AppProvider } from "@toolpad/core";
import BrainLogo from "../../../public/img/circuito.ico"

const drawerWidth = 250;

const menuImplementacion = [
  { text: "Alianzas", icon: <HandshakeIcon /> },
  { text: "Empresas", icon: <BusinessIcon /> },
  { text: "Clientes", icon: <PersonIcon /> },
  { text: "Remunerados", icon: <PeopleIcon /> },
  { text: "Layouts", icon: <FilePresentIcon /> },
  { text: "Contratos", icon: <DescriptionIcon /> },
];

const menuNominas = [
  { text: "Nominas", icon: <PaymentsIcon /> },
  { text: "Recibos", icon: <PictureAsPdfIcon /> },
  { text: "Reportes", icon: <LeaderboardIcon /> },
];

const menuImss = [
  { text: "Generales IMSS", icon: <PaymentsIcon /> },
  { text: "Cargos x anticipo", icon: <PriceChangeIcon /> },
  { text: "Obras", icon: <HistoryEduIcon /> },
];

const menuFacturacion = [
  { text: "Facturas", icon: <ArticleIcon /> },
  { text: "Complemento de pago", icon: <MonetizationOnIcon /> },
  { text: "Notas de Credito", icon: <PaymentIcon /> },
  { text: "Depositos", icon: <AssuredWorkloadIcon /> },
];

const menuGastos = [
  { text: "Solicitud de Gastos", icon: <MonetizationOnIcon /> },
  { text: "Proveedores", icon: <FactoryIcon /> },
];

const menuUtilerias = [
  { text: "Lector XML", icon: <UploadFileIcon /> },
  { text: "Bancos", icon: <LocalAtmIcon /> },
  { text: "Asignacion de cuentas", icon: <DashboardIcon /> },
  { text: "Fondeos", icon: <RequestQuoteIcon /> },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const styles = {
  body: {
    width: "100%",
    minHeight: "140px",
    background: "linear-gradient(to bottom, #1E7FE3, #5DABFF)",
    padding: "16px",
    position: "relative",
    overflow: "visible",
    zIndex: 2,
  },
};

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    backgroundColor: theme.palette.background.paper,
  },
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

const menuSoporte = [{ text: "Usuarios", icon: <SettingsIcon /> }];

const SectionTitle = ({ open, children, onClick, isExpanded, disabled }) => {
  const theme = useTheme();

  return (
    <Box
      onClick={!disabled ? onClick : undefined}
      /* onClick={onClick} */
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        cursor: "pointer",
        py: 1,
        position: "relative",
        opacity: disabled ? 0.5 : 1,
        userSelect: "none", // Esto evita la selección de texto
        WebkitUserSelect: "none", // Para compatibilidad con Safari
        MozUserSelect: "none", // Para compatibilidad con Firefox
        msUserSelect: "none",
        "&:hover .expand-icon": {
          backgroundColor: theme.palette.action.hover,
          borderRadius: "50%",
        },
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          opacity: open ? 1 : 0,
          color: disabled
            ? theme.palette.text.disabled
            : theme.palette.text.secondary,
          transition: theme.transitions.create("opacity"),
          fontSize: "0.90rem",
          color: theme.palette.text.secondary,
          textTransform: "uppercase",
        }}
      >
        {children}
      </Typography>

      {!disabled && (
        <Tooltip
          title={`${isExpanded ? "Ocultar" : "Mostrar"} ${children}`}
          placement="right"
        >
          <IconButton
            className="expand-icon"
            size="small"
            sx={{
              position: "absolute",
              right: 8,
              p: 0.5,
              transform: isExpanded ? "rotate(0deg)" : "rotate(-90deg)",
              transition: theme.transitions.create([
                "transform",
                "background-color",
              ]),
              opacity: 1,
              visibility: "visible",
              color: theme.palette.text.secondary,
              "&:hover": {
                backgroundColor: theme.palette.action.selected,
                transform: isExpanded
                  ? "rotate(0deg) scale(1.1)"
                  : "rotate(-90deg) scale(1.1)",
              },
            }}
          >
            <ExpandMoreIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default function MiniDrawer({ appContext }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [expandedSections, setExpandedSections] = React.useState({
    implementacion: false,
    nominas: false,
    imss: false,
    facturacion: false,
    gastos: false,
    utilerias: false,
    soporte: false,
  });

  React.useEffect(() => {
  setExpandedSections(prev => {
    const newState = {};
    Object.keys(prev).forEach(key => {
      newState[key] = open; // true si drawer está abierto, false si está cerrado
    });
    return newState;
  });
}, [open]);

  // Filtra menús según permisos
  const filteredMenuImplementacion = menuImplementacion.filter((item) => {
    return appContext.permissions.implementacion || item.text === "Clientes"; // Ejemplo: siempre mostrar "Clientes"
  });

  const toggleSection = (section) => {
    
    if (appContext.permissions[section] !== true) {
      return;
    }
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  /*   const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }; */

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: open
            ? theme.palette.background.default
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
              color: open ? theme.palette.text.Appbar : "inherit",
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
              display: "none",
            },
            msOverflowStyle: "none", // IE and Edge
            scrollbarWidth: "none", // Firefox
          },
        }}
      >
        {/* DrawerHeader con lectura de usuarios */}
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
                {appContext.user.id} | {appContext.user.name}
              </Typography>
              <Typography variant="caption" display="block" color="white">
                {appContext.user.email}
              </Typography>
              <Typography variant="caption" display="block" color="white">
                IP: {appContext.user.ip}
              </Typography>
            </Box>
          )}
        </DrawerHeader>
        {/* <DrawerHeader
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
                32 | Jose Gabriel Alvarez Perez
              </Typography>
              <Typography variant="caption" display="block" color="white">
                correo@email
              </Typography>

              <Typography variant="caption" display="block" color="white">
                IP
              </Typography>
            </Box>
          )}
        </DrawerHeader> */}
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
          {/* Ondas azul */}
          <svg
            viewBox="0 0 500 100"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              bottom: "0px", // Sube toda la onda hacia arriba
              left: 0,
              width: "100%",
              height: "100px",
              zIndex: 0,
            }}
          >
            {/* 1. Onda principal (base blanca) - CURVA MÁS AMPLIA */}
            <path
              d="M0,35 C125,20 375,95 500,50 L500,100 L0,100 Z" // Más ancha y pronunciada
              style={{ fill: "white" }}
            />

            {/* 2. Ondas decorativas (DIBUJADAS ENCIMA CON TRANSPARENCIA) */}
            {/* Decorativa 1 (izquierda más marcada) */}
            <path
              d="M0,35 C150,-5 350,85 500,45 L500,100 L0,100 Z"
              style={{ fill: "white", opacity: 0.6 }} // Más opaca para destacar
            />
            {/* Decorativa 2 */}
            <path
              d="M0,50 C130,15 370,90 500,50 L500,100 L0,100 Z"
              style={{ fill: "white", opacity: 0.4 }}
            />
            {/* Decorativa 3 */}
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
        {/* Menu de navegación */}
        {appContext.permissions.implementacion && (
          <>
            <Divider />
            <SectionTitle
              open={open}
              onClick={() => toggleSection("implementacion")}
              isExpanded={expandedSections.implementacion}
              disable={!appContext.permissions.implementacion}
            >
              {/* IMPLEMENTACIÓN */}
            </SectionTitle>
            {/* Render Menú de implementación */}
            <Grow
              in={expandedSections.implementacion}
              timeout={{
                enter: 250,
                exit: 150, // Permitimos un poco de tiempo para sincronizar
              }}
              style={{ transformOrigin: "top center" }}
              easing={{
                enter: "cubic-bezier(0.175, 0.885, 0.32, 1.35)",
                exit: "linear", // Suavizamos la salida del Grow
              }}
            >
              <Box>
                <Slide
                  direction="up"
                  in={expandedSections.implementacion}
                  timeout={{
                    enter: 0,
                    exit: 400,
                  }}
                  easing={{
                    exit: "cubic-bezier(0.68, -0.8, 0.62, 1.6)", // Rebote más exagerado
                  }}
                  style={{
                    transformOrigin: "top center",
                    transition:
                      "transform 0.4s cubic-bezier(0.68, -0.8, 0.62, 1.6)",
                  }}
                >
                  <Box
                    sx={{
                      transform: expandedSections.implementacion
                        ? "scaleY(1)"
                        : "scaleY(0.8)",
                      transition: expandedSections.implementacion
                        ? "transform 0.25s ease-out"
                        : "transform 0.4s cubic-bezier(0.68, -0.8, 0.62, 1.6)",
                      boxShadow: expandedSections.implementacion
                        ? "none"
                        : "0px -5px 10px rgba(0,0,0,0.1)", // Sombra durante el cierre
                    }}
                  >
                    {expandedSections.implementacion && (
                      <MenuList
                        menuItems={menuImplementacion}
                        open={open}
                        context={appContext}
                      />
                    )}
                  </Box>
                </Slide>
              </Box>
            </Grow>
          </>
        )}
        {appContext.permissions.nominas && (
          <>
            <Divider />
            <SectionTitle
              open={open}
              onClick={() => toggleSection("nominas")}
              isExpanded={expandedSections.nominas}
              disable={!appContext.permissions.nominas}
            >
              NÓMINAS
            </SectionTitle>
            <Grow
              in={expandedSections.nominas}
              timeout={{
                enter: 250,
                exit: 150, // Permitimos un poco de tiempo para sincronizar
              }}
              style={{ transformOrigin: "top center" }}
              easing={{
                enter: "cubic-bezier(0.175, 0.885, 0.32, 1.35)",
                exit: "linear", // Suavizamos la salida del Grow
              }}
            >
              <Box>
                <Slide
                  direction="up"
                  in={expandedSections.nominas}
                  timeout={{
                    enter: 0,
                    exit: 400,
                  }}
                  easing={{
                    exit: "cubic-bezier(0.68, -0.8, 0.62, 1.6)", // Rebote más exagerado
                  }}
                  style={{
                    transformOrigin: "top center",
                    transition:
                      "transform 0.4s cubic-bezier(0.68, -0.8, 0.62, 1.6)",
                  }}
                >
                  <Box
                    sx={{
                      transform: expandedSections.nominas
                        ? "scaleY(1)"
                        : "scaleY(0.8)",
                      transition: expandedSections.nominas
                        ? "transform 0.25s ease-out"
                        : "transform 0.4s cubic-bezier(0.68, -0.8, 0.62, 1.6)",
                      boxShadow: expandedSections.nominas
                        ? "none"
                        : "0px -5px 10px rgba(0,0,0,0.1)", // Sombra durante el cierre
                    }}
                  >
                    {expandedSections.nominas && (
                      <MenuList
                        menuItems={menuNominas}
                        open={open}
                        context={appContext}
                      />
                    )}
                  </Box>
                </Slide>
              </Box>
            </Grow>
          </>
        )}
        {appContext.permissions.imss && (
          <>
            <Divider />
            <SectionTitle
              open={open}
              onClick={() => toggleSection("imss")}
              isExpanded={expandedSections.imss}
              disable={!appContext.permissions.imss}
            >
              IMSS
            </SectionTitle>
            <Grow
              in={expandedSections.imss}
              timeout={{
                enter: 250,
                exit: 150, // Permitimos un poco de tiempo para sincronizar
              }}
              style={{ transformOrigin: "top center" }}
              easing={{
                enter: "cubic-bezier(0.175, 0.885, 0.32, 1.35)",
                exit: "linear", // Suavizamos la salida del Grow
              }}
            >
              <Box>
                <Slide
                  direction="up"
                  in={expandedSections.imss}
                  timeout={{
                    enter: 0,
                    exit: 400,
                  }}
                  easing={{
                    exit: "cubic-bezier(0.68, -0.8, 0.62, 1.6)", // Rebote más exagerado
                  }}
                  style={{
                    transformOrigin: "top center",
                    transition:
                      "transform 0.4s cubic-bezier(0.68, -0.8, 0.62, 1.6)",
                  }}
                >
                  <Box
                    sx={{
                      transform: expandedSections.imss
                        ? "scaleY(1)"
                        : "scaleY(0.8)",
                      transition: expandedSections.imss
                        ? "transform 0.25s ease-out"
                        : "transform 0.4s cubic-bezier(0.68, -0.8, 0.62, 1.6)",
                      boxShadow: expandedSections.imss
                        ? "none"
                        : "0px -5px 10px rgba(0,0,0,0.1)", // Sombra durante el cierre
                    }}
                  >
                    {expandedSections.imss && (
                      <MenuList
                        menuItems={menuImss}
                        open={open}
                        context={appContext}
                      />
                    )}
                  </Box>
                </Slide>
              </Box>
            </Grow>
          </>
        )}
        {appContext.permissions.facturacion && (
          <>
            <Divider />
            <SectionTitle
              open={open}
              onClick={() => toggleSection("facturacion")}
              isExpanded={expandedSections.facturacion}
              disable={!appContext.permissions.facturacion}
            >
              FACTURACIÓN
            </SectionTitle>
            <Grow
              in={expandedSections.facturacion}
              timeout={{
                enter: 250,
                exit: 150, // Permitimos un poco de tiempo para sincronizar
              }}
              style={{ transformOrigin: "top center" }}
              easing={{
                enter: "cubic-bezier(0.175, 0.885, 0.32, 1.35)",
                exit: "linear", // Suavizamos la salida del Grow
              }}
            >
              <Box>
                <Slide
                  direction="up"
                  in={expandedSections.facturacion}
                  timeout={{
                    enter: 0,
                    exit: 400,
                  }}
                  easing={{
                    exit: "cubic-bezier(0.68, -0.8, 0.62, 1.6)", // Rebote más exagerado
                  }}
                  style={{
                    transformOrigin: "top center",
                    transition:
                      "transform 0.4s cubic-bezier(0.68, -0.8, 0.62, 1.6)",
                  }}
                >
                  <Box
                    sx={{
                      transform: expandedSections.facturacion
                        ? "scaleY(1)"
                        : "scaleY(0.8)",
                      transition: expandedSections.facturacion
                        ? "transform 0.25s ease-out"
                        : "transform 0.4s cubic-bezier(0.68, -0.8, 0.62, 1.6)",
                      boxShadow: expandedSections.facturacion
                        ? "none"
                        : "0px -5px 10px rgba(0,0,0,0.1)", // Sombra durante el cierre
                    }}
                  >
                    {expandedSections.facturacion && (
                      <MenuList
                        menuItems={menuFacturacion}
                        open={open}
                        context={appContext}
                      />
                    )}
                  </Box>
                </Slide>
              </Box>
            </Grow>
          </>
        )}
        {appContext.permissions.gastos && (
          <>
            <Divider />
            <SectionTitle
              open={open}
              onClick={() => toggleSection("gastos")}
              isExpanded={expandedSections.gastos}
              disable={!appContext.permissions.gastos}
            >
              GASTOS
            </SectionTitle>
            <Grow
              in={expandedSections.gastos}
              timeout={{ enter: 250, exit: 150 }}
              style={{ transformOrigin: "top center" }}
              easing={{
                enter: "cubic-bezier(0.175, 0.885, 0.32, 1.35)",
                exit: "linear",
              }}
            >
              <Box>
                <Slide
                  direction="up"
                  in={expandedSections.gastos}
                  timeout={{ enter: 0, exit: 400 }}
                  easing={{ exit: "cubic-bezier(0.68, -0.8, 0.62, 1.6)" }}
                  style={{
                    transformOrigin: "top center",
                    transition:
                      "transform 0.4s cubic-bezier(0.68, -0.8, 0.62, 1.6)",
                  }}
                >
                  <Box
                    sx={{
                      transform: expandedSections.gastos
                        ? "scaleY(1)"
                        : "scaleY(0.8)",
                      transition: expandedSections.gastos
                        ? "transform 0.25s ease-out"
                        : "transform 0.4s cubic-bezier(0.68, -0.8, 0.62, 1.6)",
                      boxShadow: expandedSections.gastos
                        ? "none"
                        : "0px -5px 10px rgba(0,0,0,0.1)",
                    }}
                  >
                    {expandedSections.gastos && (
                      <MenuList
                        menuItems={menuGastos}
                        open={open}
                        context={appContext}
                      />
                    )}
                  </Box>
                </Slide>
              </Box>
            </Grow>
          </>
        )}
        {appContext.permissions.utilerias && (
          <>
            <Divider />
            <SectionTitle
              open={open}
              onClick={() => toggleSection("utilerias")}
              isExpanded={expandedSections.utilerias}
              disable={!appContext.permissions.utilerias}
            >
              UTILERIAS
            </SectionTitle>
            <Grow
              in={expandedSections.utilerias}
              timeout={{ enter: 250, exit: 150 }}
              style={{ transformOrigin: "top center" }}
              easing={{
                enter: "cubic-bezier(0.175, 0.885, 0.32, 1.35)",
                exit: "linear",
              }}
            >
              <Box>
                <Slide
                  direction="up"
                  in={expandedSections.utilerias}
                  timeout={{ enter: 0, exit: 400 }}
                  easing={{ exit: "cubic-bezier(0.68, -0.8, 0.62, 1.6)" }}
                  style={{
                    transformOrigin: "top center",
                    transition:
                      "transform 0.4s cubic-bezier(0.68, -0.8, 0.62, 1.6)",
                  }}
                >
                  <Box
                    sx={{
                      transform: expandedSections.utilerias
                        ? "scaleY(1)"
                        : "scaleY(0.8)",
                      transition: expandedSections.utilerias
                        ? "transform 0.25s ease-out"
                        : "transform 0.4s cubic-bezier(0.68, -0.8, 0.62, 1.6)",
                      boxShadow: expandedSections.utilerias
                        ? "none"
                        : "0px -5px 10px rgba(0,0,0,0.1)",
                    }}
                  >
                    {expandedSections.utilerias && (
                      <MenuList
                        menuItems={menuUtilerias}
                        open={open}
                        context={appContext}
                      />
                    )}
                  </Box>
                </Slide>
              </Box>
            </Grow>
          </>
        )}
        {appContext.permissions.soporte && (
          <>
            <Divider />
            <SectionTitle
              open={open}
              onClick={() => toggleSection("soporte")}
              isExpanded={expandedSections.soporte}
              disable={!appContext.permissions.soporte}
            >
              SOPORTE
            </SectionTitle>
            <Grow
              in={expandedSections.soporte}
              timeout={{ enter: 250, exit: 150 }}
              style={{ transformOrigin: "top center" }}
              easing={{
                enter: "cubic-bezier(0.175, 0.885, 0.32, 1.35)",
                exit: "linear",
              }}
            >
              <Box>
                <Slide
                  direction="up"
                  in={expandedSections.soporte}
                  timeout={{ enter: 0, exit: 400 }}
                  easing={{ exit: "cubic-bezier(0.68, -0.8, 0.62, 1.6)" }}
                  style={{
                    transformOrigin: "top center",
                    transition:
                      "transform 0.4s cubic-bezier(0.68, -0.8, 0.62, 1.6)",
                  }}
                >
                  <Box
                    sx={{
                      transform: expandedSections.soporte
                        ? "scaleY(1)"
                        : "scaleY(0.8)",
                      transition: expandedSections.soporte
                        ? "transform 0.25s ease-out"
                        : "transform 0.4s cubic-bezier(0.68, -0.8, 0.62, 1.6)",
                      boxShadow: expandedSections.soporte
                        ? "none"
                        : "0px -5px 10px rgba(0,0,0,0.1)",
                    }}
                  >
                    {expandedSections.soporte && (
                      <MenuList
                        menuItems={menuSoporte}
                        open={open}
                        context={appContext}
                      />
                    )}
                  </Box>
                </Slide>
              </Box>
            </Grow>
          </>
        )}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}
