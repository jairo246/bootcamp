import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import Slide from '@mui/material/Slide';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MenuItem from '@mui/material/MenuItem';
import { OrderRequest } from '../orders/interfaceOrders';
import { TransitionProps } from '@mui/material/transitions';
import { Send } from './interfaceTransitions';
import { previousDay } from 'date-fns';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const currencies = [
  {
    value: '1',
    label: 'mesa 1',
  },
  {
    value: '2',
    label: 'mesa 2',
  },
  {
    value: '3',
    label: 'mesa 3',
  },
  {
    value: '4',
    label: 'mesa 4',
  },
];

const initialState:OrderRequest = {
      id: 327,
      created_at: 0,
      waiter: 2,
      table: 0,
      order: [{
        product: 1 , quantity: 1
    }]
}


const Modal = ({
    open,
    setOpen
}:Send) => {
  
  const [openS, setOpenS] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("Error");
  const [order, setOrder] = useState<OrderRequest>(initialState);

  const hadleTable = (mesa:number) => {
    setOrder({...order,
              table: mesa});
  }
  
  const handleCloseS = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenS(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrder({...order,
      table: 3});//event.target});
  };

  const handleClose = () => {
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  async function createOrder(){

    setOpenS(true);

      const tokenType = 'Bearer'
      const accesToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiTWFkb25uYSIsInVzZXIiOiJtYWRvbm5hIiwicm9sZXMiOlsiYWRtaW4iXX0.5l4DWWWWhxarAzv9NIiUfoFYiSe6QpmjT2B1SkQjpV4';
    
      const acceso = tokenType + " " + accesToken;
    
      const myHeaders = new Headers();  
    
      myHeaders.append("Authorization", acceso);

      const requestOptions: RequestInit = {
          method: 'PUT',
          headers: myHeaders,
          redirect: 'follow',
          body: JSON.stringify(order)
        };

      try{

        const resOrders = await fetch('https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/api/orders', requestOptions);

        const orders = await resOrders.json();
        setMessage(orders.message);
      } catch{

      }
           
  }

  return (
    <div> 
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Crear envio
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent dividers>
          <Grid>
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              value={currencies[0].value}
              onChange={handleChange}
              helperText="Please select your currency"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
              <Typography>{order.table}</Typography>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={createOrder}>
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openS}
        autoHideDuration={6000}
        onClose={handleCloseS}
        message={message}
        action={action}
      />
    </div>
  );
}

export default Modal;