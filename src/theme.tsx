// theme.ts
import { createTheme, ThemeOptions } from '@mui/material/styles';

const theme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: '#FF0000',  // Rojo para el color principal (AppBar y botones)
    },
    secondary: {
      main: '#FFFFFF',  // Blanco para los colores secundarios (textos)
    },
    background: {
      default: '#000000', // Fondo negro para toda la página
    },
  },
  typography: {
    fontFamily: [
      'Montserrat',
      'Roboto, Arial, sans-serif'
    ].join(','),
    // Colores de texto por defecto
    h1: {
      color: '#FFFFFF', // Texto blanco para los encabezados
    },
    h2: {
      color: '#FFFFFF', // Texto blanco para los encabezados
    },
    // Otros encabezados y textos si los necesitas
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#E30613', // Fondo rojo para el AppBar (header)
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#FFFFFF', // Texto blanco por defecto en la tipografía
        },
      },
    },
  },
});

export default theme;
