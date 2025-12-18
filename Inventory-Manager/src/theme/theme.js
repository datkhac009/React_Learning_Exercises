import { createTheme } from "@mui/material";

export const  themeLight = createTheme({
    palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
})
export const themeDark = createTheme({
    palette: {
     mode: 'dark',
    primary: {
      main: '#90caf9', 
    },
    background: {
      default: '#2A2A2A', 
      paper: '#1a1a1a',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.87)', 
      secondary: 'rgba(255, 255, 255, 0.60)', 
    },
  },
  
  components: {
     MuiTableCell: {
       styleOverrides: {
         root: {
           borderColor: '#2a2a2a', 
         },
       },
     },
 }
})