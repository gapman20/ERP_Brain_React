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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

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

const menuSoporte = [{ text: "Usuarios", icon: <SettingsIcon /> }];

/* const SectionTitle = ({ open, children, onClick, isExpanded }) => {
  const theme = useTheme(); // ← Esto es clave
  
  return (
    <Box 
      onClick={onClick}
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        cursor: 'pointer',
        py: 1,
        '&:hover': { 
          backgroundColor: theme.palette.action.hover // ← Usa el color del tema
        }
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          opacity: open ? 1 : 0,
          transition: theme.transitions.create('opacity', { // ← Usa la transición del tema
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          fontSize: '0.75rem',
          color: theme.palette.text.secondary, // ← Color del tema
          textTransform: 'uppercase'
        }}
      >
        {children}
      </Typography>
      {open && <ExpandMoreIcon sx={{ 
        transform: isExpanded ? 'rotate(0)' : 'rotate(-90deg)',
        transition: theme.transitions.create('transform', { // ← Transición del tema
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.standard,
        }),
        ml: 1,
        fontSize: open ? '1rem' : '1.2rem',
        color: theme.palette.text.secondary // ← Color del tema
      }} />}
    </Box>
  );
}; */

const SectionTitle = ({ open, children, onClick, isExpanded }) => {
  const theme = useTheme();

  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        py: 1,
        position: "relative",
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
          transition: theme.transitions.create("opacity"),
          fontSize: "0.75rem",
          color: theme.palette.text.secondary,
          textTransform: "uppercase",
        }}
      >
        {children}
      </Typography>

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
    </Box>
  );
};

const sectionMixin = (theme, expanded) => ({
  height: expanded ? "auto" : 0,
  opacity: expanded ? 1 : 0,
  overflow: "hidden",
  transition: theme.transitions.create(["height", "opacity"], {
    easing: theme.transitions.easing.sharp,
    duration: expanded
      ? theme.transitions.duration.enteringScreen
      : theme.transitions.duration.leavingScreen,
  }),
});

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [expandedSections, setExpandedSections] = React.useState({
    implementacion: true,
    nominas: true,
    imss: true,
    facturacion: true,
    gastos: true,
    utilerias: true,
    soporte: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="close drawer"
            onClick={handleDrawerClose}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              !open && { display: "none" },
            ]}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Brain ERP
          </Typography>
          <IconButton size="large" color="inherit">
            <HelpIcon />
          </IconButton>
          <IconButton size="large" color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton size="large" color="inherit">
            <MoreVertIcon />
          </IconButton>
          <IconButton
            size="large"
            aria-label="Cuenta actual del usuario"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: theme.spacing(1, 2),
            minHeight: "80px",
          }}
        >
          {open && (
            <Box
              sx={{
                textAlign: "center",
                padding: theme.spacing(1, 2),
                marginBottom: theme.spacing(1),
              }}
            >
              <Typography variant="caption" color="text.secondary">
                32 | Jose Gabriel Alvarez Perez
              </Typography>
              <Typography
                variant="caption"
                display="block"
                color="text.secondary"
              >
                correo@email
              </Typography>

              <Typography
                variant="caption"
                display="block"
                color="text.secondary"
              >
                IP
              </Typography>
            </Box>
          )}
        </DrawerHeader>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: open ? "20px" : "12px",
          }}
        >
          <img
            src="../../../public/img/circuito.ico"
            alt="Logo de la empresa"
            style={{
              width: open ? "50px" : "30px",
              transition: "width 0.3s ease",
              border: 1,
            }}
          />
        </Box>
        <Divider />
        <SectionTitle
          open={open}
          onClick={() => toggleSection("implementacion")}
          isExpanded={expandedSections.implementacion}
        >
          IMPLEMENTACIÓN
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
                  <MenuList menuItems={menuImplementacion} open={open} />
                )}
              </Box>
            </Slide>
          </Box>
        </Grow>

        <Divider />
        <SectionTitle
          open={open}
          onClick={() => toggleSection("nominas")}
          isExpanded={expandedSections.nominas}
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
                  <MenuList menuItems={menuNominas} open={open} />
                )}
              </Box>
            </Slide>
          </Box>
        </Grow>

        <Divider />
        <SectionTitle
          open={open}
          onClick={() => toggleSection("imss")}
          isExpanded={expandedSections.imss}
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
                  <MenuList menuItems={menuImss} open={open} />
                )}
              </Box>
            </Slide>
          </Box>
        </Grow>
        <Divider />
        <SectionTitle
          open={open}
          onClick={() => toggleSection("facturacion")}
          isExpanded={expandedSections.facturacion}
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
                  <MenuList menuItems={menuFacturacion} open={open} />
                )}
              </Box>
            </Slide>
          </Box>
        </Grow>
        <Divider />
        <SectionTitle
          open={open}
          onClick={() => toggleSection("gastos")}
          isExpanded={expandedSections.gastos}
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
                  <MenuList menuItems={menuGastos} open={open} />
                )}
              </Box>
            </Slide>
          </Box>
        </Grow>
        <Divider />
        <SectionTitle
          open={open}
          onClick={() => toggleSection("utilerias")}
          isExpanded={expandedSections.utilerias}
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
                  <MenuList menuItems={menuUtilerias} open={open} />
                )}
              </Box>
            </Slide>
          </Box>
        </Grow>

        <Divider />
        <SectionTitle
          open={open}
          onClick={() => toggleSection("soporte")}
          isExpanded={expandedSections.soporte}
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
                  <MenuList menuItems={menuSoporte} open={open} />
                )}
              </Box>
            </Slide>
          </Box>
        </Grow>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}
