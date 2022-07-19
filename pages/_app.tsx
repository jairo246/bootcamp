import defaultTheme from '../defaultTheme';
import { ThemeProvider } from '@mui/material/styles';
import DrawerMenu from '../components/navegation/drawer';
import type { AppProps } from 'next/app'
import { AuthProvider } from '../components/context/user/userContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider>
          <DrawerMenu>  
              <Component {...pageProps} />
          </DrawerMenu>
      </AuthProvider>  
    </ThemeProvider>
  );
}

export default MyApp
