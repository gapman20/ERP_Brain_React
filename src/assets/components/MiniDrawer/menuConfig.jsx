import HandshakeIcon from "@mui/icons-material/Handshake";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import DescriptionIcon from "@mui/icons-material/Description";
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

export const menuImplementacion = [
  { text: "Alianzas", icon: <HandshakeIcon />, permissions: "alianzas" },
  { text: "Empresas", icon: <BusinessIcon />, permissions: "empresas" },
  { text: "Clientes", icon: <PersonIcon />, permissions: "clientes" },
  { text: "Remunerados", icon: <PeopleIcon />, permissions: "remunerados" },
  { text: "Layouts", icon: <FilePresentIcon />, permissions: "layouts" },
  { text: "Contratos", icon: <DescriptionIcon />, permissions: "contratos" },
];

export const menuNominas = [
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

export const menuImss = [
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

export const menuFacturacion = [
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

export const menuGastos = [
  {
    text: "Solicitud de Gastos",
    icon: <MonetizationOnIcon />,
    permissions: "solicitud_gastos",
  },
  { text: "Proveedores", icon: <FactoryIcon />, permissions: "proveedores" },
  { text: "Archivos", icon: <FolderIcon />, permissions: "archivos" },
  { text: "Concentrador", icon: <MemoryIcon />, permissions: "concentrador" },
];

export const menuUtilerias = [
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

export const menuSoporte = [
  { text: "Usuarios", icon: <SettingsIcon />, permissions: "usuarios" },
  { text: "Tickets", icon: <SupportAgentIcon />, permissions: "tickets" },
  {
    text: "Notificaciones",
    icon: <NotificationsActiveIcon />,
    permissions: "notificaciones",
  },
];
