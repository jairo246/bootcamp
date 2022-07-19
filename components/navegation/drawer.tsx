import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Router from './router';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { Grid } from '@mui/material';
import { useAuth } from "../context/user/userContext";

const drawerWidth = 240;

interface Props {
  children: JSX.Element
}

 const DrawerMenu = ({
    children}: Props) => {

  const { auth, getStorage, lessWait, logOut, reset} = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const [second, setSecond] = useState<String>('00');
  const [minute, setMinute] = useState<String>('00');

  useEffect(() => {
    
    let intervalId = "";
    if(auth.wait == 0){reset()}

    if(auth.breck && auth.role == ""){

      // @ts-ignore
      intervalId = setInterval(() => {

        const secondCounter = auth.wait % 60;
        const minuteCounter = Math.floor(auth.wait / 60);

        const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}`: secondCounter;
        const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}`: minuteCounter;

        // @ts-ignore
        setSecond(computedSecond);
        // @ts-ignore
        setMinute(computedMinute);

        lessWait();
      },1000);
    }

    return () => clearInterval(intervalId);

  }, [auth.breck, auth.wait, auth.role])

  useEffect(() =>{ if(auth.start == 0) {getStorage()}} ,[auth.start]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <Grid   container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"> 

          <Typography variant="h6" noWrap component="div">
                  Tienda de Comida
          </Typography>
          {auth.breck == true && auth.role == ""?
          <Grid>
            <span>{minute}</span>
            <span>:</span>
            <span>{second}</span>
          </Grid>
          : <div></div>}
          <Chip label={auth.role != "" ? auth.role  : `Intentos: ${auth.try}`}variant="outlined" />
          </Grid>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <Router/>
          <Grid container spacing={3} mt={3}
                direction="column"
                justifyContent="space-between"
                alignItems="center">
          <Grid>
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={auth.img}>
              A
            </Avatar>
          </Grid>
          {auth.name != "" ? <>
            <Grid mt={2}>
              <Chip label={auth.name} variant="outlined" />
            </Grid>
            <Grid mt={9}>
              <Button onClick={logOut}>
                <Typography>
                    Salir
                </Typography>
              </Button>
            </Grid>
            </>
          : <div></div>}
          </Grid>
          
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
export default DrawerMenu;