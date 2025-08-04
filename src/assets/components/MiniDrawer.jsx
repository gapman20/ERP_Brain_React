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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuList from "./MenuList";

const drawerWidth = 260;

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

const SectionTitle = ({ open, children, onClick, isExpanded }) => {
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
        color: theme.palette.text.secondary // ← Color del tema
      }} />}
    </Box>
  );
};

const sectionMixin = (theme, expanded) => ({
  height: expanded ? 'auto' : 0,
  opacity: expanded ? 1 : 0,
  overflow: 'hidden',
  transition: theme.transitions.create(['height', 'opacity'], {
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
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
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
          onClick={() => toggleSection('implementacion')}
          isExpanded={expandedSections.implementacion}
        >IMPLEMENTACIÓN</SectionTitle>
        {/* Render Menú de implementación */}
        {expandedSections.implementacion && (
          <MenuList menuItems={menuImplementacion} open={open} />
        )}



        <Divider />
        <SectionTitle open={open}>NÓMINAS</SectionTitle>
        <MenuList menuItems={menuNominas} open={open} />

        <Divider />
        <SectionTitle open={open}>IMSS</SectionTitle>
        <MenuList menuItems={menuImss} open={open} />

        <Divider />
        <SectionTitle open={open}>FACTURACIÓN</SectionTitle>
        <MenuList menuItems={menuFacturacion} open={open} />

        <Divider />
        <SectionTitle open={open}>GASTOS</SectionTitle>
        <MenuList menuItems={menuGastos} open={open} />

        <Divider />
        <SectionTitle open={open}>UTILERIAS</SectionTitle>
        <MenuList menuItems={menuUtilerias} open={open} />

        <Divider />
        <SectionTitle open={open}>SOPORTE</SectionTitle>
        <MenuList menuItems={menuSoporte} open={open} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}
