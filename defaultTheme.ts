import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        paper: "#121212",
        default: "#455a64"
      },
    },
  });

export default defaultTheme;