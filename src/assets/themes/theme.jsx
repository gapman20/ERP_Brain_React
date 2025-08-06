import { createTheme } from '@mui/material/styles';
import '@fontsource/inter/300.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#1E7FE3', 
      light: '#5DABFF', 
      dark: '#0057B0',
    },
    secondary: {
      main: '#f50057',
    },
      background: {
      default: '#E9F5FE', // Fondo gris claro
      paper: '#FFFFFF',   // Fondo para componentes tipo "paper"
      grey: '#D9DEDE',
      login: '#F3F9FF',
      icono: '#E9F5FE'
    },

  },
  
  typography: {
    fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
    fontSize: 14,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', 
        },
      },
    },

  },
});

export default customTheme;