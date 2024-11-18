// theme.ts
import { createTheme, ThemeOptions } from '@mui/material/styles';

const theme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: '#FF0000',
    },
    secondary: {
      main: '#FFFFFF',
    },
    background: {
      default: '#000000',
    },
  },
  typography: {
    fontFamily: [
      'Interstate, Arial, sans-serif', // Usa el nombre que definiste en @font-face 
      'Montserrat',
      'Roboto, Arial, sans-serif'
    ].join(','),
    h1: {
      color: '#FFFFFF',
    },
    h2: {
      color: '#FFFFFF',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#E30613', // Fondo rojo para el AppBar (header)
        },
      },
    },
  },
});

export default theme;
