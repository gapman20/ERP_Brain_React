import { createTheme } from '@mui/material/styles';

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
      default: '#AFB3B3', // Fondo gris claro
      paper: '#FFFFFF',   // Fondo para componentes tipo "paper"
      grey: '#D9DEDE'
    },

  },
  
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
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