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
import BrainLogo from "../../../public/img/circuito.ico";
import SettingsSystemDaydreamIcon from "@mui/icons-material/SettingsSystemDaydream";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BarChartIcon from "@mui/icons-material/BarChart";
import Groups3Icon from "@mui/icons-material/Groups3";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FolderIcon from "@mui/icons-material/Folder";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import MemoryIcon from "@mui/icons-material/Memory";
import BalanceIcon from "@mui/icons-material/Balance";
import DateRangeIcon from "@mui/icons-material/DateRange";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import StorageIcon from "@mui/icons-material/Storage";
import SendIcon from "@mui/icons-material/Send";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Outlet } from "react-router-dom";

const drawerWidth = 250;

const menuImplementacion = [
  { text: "Alianzas", icon: <HandshakeIcon />, permissions: "alianzas" },
  { text: "Empresas", icon: <BusinessIcon />, permissions: "empresas" },
  { text: "Clientes", icon: <PersonIcon />, permissions: "clientes" },
  { text: "Remunerados", icon: <PeopleIcon />, permissions: "remunerados" },
  { text: "Layouts", icon: <FilePresentIcon />, permissions: "layouts" },
  { text: "Contratos", icon: <DescriptionIcon />, permissions: "contratos" },
];

const menuNominas = [
  { text: "Nominas", icon: <PaymentsIcon />, permissions: "nominas" },
  { text: "Recibos", icon: <PictureAsPdfIcon />, permissions: "recibidos" },
  { text: "Reportes", icon: <LeaderboardIcon />, permissions: "reportes" },
  {
    text: "Movimientos",
    icon: <SettingsSystemDaydreamIcon />,
    permissions: "movimientos",
  },
  {
    text: "Calendario",
    icon: <CalendarMonthIcon />,
    permissions: "calendario",
  },
];

const menuImss = [
  {
    text: "Generales IMSS",
    icon: <PaymentsIcon />,
    permissions: "generales_imss",
  },
  {
    text: "Cargos x anticipo",
    icon: <PriceChangeIcon />,
    permissions: "cargos_anticipo",
  },
  { text: "Reportes", icon: <BarChartIcon />, permissions: "reportes" },
  { text: "Obras", icon: <HistoryEduIcon />, permissions: "obras" },
  {
    text: "Calculo de sueldos",
    icon: <RequestQuoteIcon />,
    permissions: "calculo_sueldos",
  },
  {
    text: "Altas pendientes",
    icon: <Groups3Icon />,
    permissions: "altas_clientes",
  },
  {
    text: "Concilacion Infonacot",
    icon: <ShowChartIcon />,
    permissions: "concilacion_infonacot",
  },
];

const menuFacturacion = [
  { text: "Facturas", icon: <ArticleIcon />, permissions: "facturas" },
  {
    text: "Complemento de pago",
    icon: <MonetizationOnIcon />,
    permissions: "complemento_pago",
  },
  {
    text: "Notas de Credito",
    icon: <PaymentIcon />,
    permissions: "notas_credito",
  },
  {
    text: "Depositos",
    icon: <AssuredWorkloadIcon />,
    permissions: "depositos",
  },
  {
    text: "Despositos bancarios",
    icon: <AccountBalanceWalletIcon />,
    permissions: "despositos_bancarios",
  },
];

const menuGastos = [
  {
    text: "Solicitud de Gastos",
    icon: <MonetizationOnIcon />,
    permissions: "solicitud_gastos",
  },
  { text: "Proveedores", icon: <FactoryIcon />, permissions: "proveedores" },
  { text: "Archivos", icon: <FolderIcon />, permissions: "archivos" },
  { text: "Concentrador", icon: <MemoryIcon />, permissions: "concentrador" },
];

const menuUtilerias = [
  { text: "Lector XML", icon: <UploadFileIcon />, permissions: "lector_xml" },
  { text: "Bancos", icon: <LocalAtmIcon />, permissions: "bancos" },
  {
    text: "Asignacion de cuentas",
    icon: <DashboardIcon />,
    permissions: "asignacion_cuentas",
  },
  { text: "Fondeos", icon: <RequestQuoteIcon />, permissions: "fondeos" },
  { text: "Cheques", icon: <FactCheckIcon />, permissions: "cheques" },
  {
    text: "Conciliaciones",
    icon: <BalanceIcon />,
    permissions: "conciliaciones",
  },
  { text: "Periodos", icon: <DateRangeIcon />, permissions: "periodos" },
  {
    text: "Indicadores anuales",
    icon: <BookmarksIcon />,
    permissions: "indicadores_anuales",
  },
  { text: "Bitacora", icon: <LibraryBooksIcon />, permissions: "bitacora" },
  { text: "Repositorio", icon: <StorageIcon />, permissions: "repositorio" },
  { text: "Envíos Nómina", icon: <SendIcon />, permissions: "envios_nomina" },
];

const menuSoporte = [
  { text: "Usuarios", icon: <SettingsIcon />, permissions: "usuarios" },
  { text: "Tickets", icon: <SupportAgentIcon />, permissions: "tickets" },
  {
    text: "Notificaciones",
    icon: <NotificationsActiveIcon />,
    permissions: "notificaciones",
  },
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

const SectionTitle = ({ open, children, onClick, isExpanded, disabled }) => {
  const theme = useTheme();

  return (
    <Box
      onClick={!disabled ? onClick : undefined}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        py: 1,
        position: "relative",
        opacity: disabled ? 0.5 : 1,
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
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

export default function MiniDrawer() {
  const theme = useTheme();
  const [user, setUser] = React.useState({});
  const [permissions, setPermissions] = React.useState({});
  const [error, setError] = React.useState(null);
  const [open, setOpen] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const hasFetched = React.useRef(false);
  const [expandedSections, setExpandedSections] = React.useState({
    implementacion: false,
    nominas: false,
    imss: false,
    facturacion: false,
    gastos: false,
    utilerias: false,
    soporte: false,
  });

  // Api fetch user y permisos
  React.useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch user data
        const userResponse = await fetch("/json/usuario.json");
        if (!userResponse.ok) throw new Error("Error loading user data");
        const userData = (await userResponse.json()).user;

        // Fetch permissions data
        const permissionsResponse = await fetch("/json/permisos.json");
        if (!permissionsResponse.ok)
          throw new Error("Error loading permissions data");
        const permissionsData = (await permissionsResponse.json()).permissions;

        setUser(userData);
        setPermissions(permissionsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const countEnabledSections = () => {
    return Object.keys(permissions).filter((key) => permissions[key] === true)
      .length;
  };

  const enabledSectionCounts = countEnabledSections();

  const enabledSections = Object.keys(permissions).filter(
    (key) => permissions[key] === true
  );

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
  }, [open, permissions]);

  const toggleSection = (section) => {
    if (permissions[section] !== true) {
      return;
    }
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
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
              timeout={{
                enter: 250,
                exit: 150,
              }}
              style={{ transformOrigin: "top center" }}
              easing={{
                enter: "cubic-bezier(0.175, 0.885, 0.32, 1.35)",
                exit: "linear",
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
                    exit: "cubic-bezier(0.68, -0.8, 0.62, 1.6)",
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
                        : "0px -5px 10px rgba(0,0,0,0.1)",
                    }}
                  >
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
              timeout={{
                enter: 250,
                exit: 150,
              }}
              style={{ transformOrigin: "top center" }}
              easing={{
                enter: "cubic-bezier(0.175, 0.885, 0.32, 1.35)",
                exit: "linear",
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
                    exit: "cubic-bezier(0.68, -0.8, 0.62, 1.6)",
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
                        : "0px -5px 10px rgba(0,0,0,0.1)",
                    }}
                  >
                    {expandedSections.nominas && (
                      <MenuList menuItems={menuNominas} open={open} />
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
              timeout={{
                enter: 250,
                exit: 150,
              }}
              style={{ transformOrigin: "top center" }}
              easing={{
                enter: "cubic-bezier(0.175, 0.885, 0.32, 1.35)",
                exit: "linear",
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
                    exit: "cubic-bezier(0.68, -0.8, 0.62, 1.6)",
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
                        : "0px -5px 10px rgba(0,0,0,0.1)",
                    }}
                  >
                    {expandedSections.imss && (
                      <MenuList menuItems={menuImss} open={open} />
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
              timeout={{
                enter: 250,
                exit: 150,
              }}
              style={{ transformOrigin: "top center" }}
              easing={{
                enter: "cubic-bezier(0.175, 0.885, 0.32, 1.35)",
                exit: "linear",
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
                    exit: "cubic-bezier(0.68, -0.8, 0.62, 1.6)",
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
                        : "0px -5px 10px rgba(0,0,0,0.1)",
                    }}
                  >
                    {expandedSections.facturacion && (
                      <MenuList menuItems={menuFacturacion} open={open} />
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
          </>
        )}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh"
        }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
