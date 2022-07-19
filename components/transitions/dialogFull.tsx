import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Full } from './interfaceTransitions';
import FoodCardExpand from "../transitions/foodCardExpand";
import {Food} from "../menu/interfaceMenu"

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = ({
    listFull,
    open,
    setOpen
}:Full) => {
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div> 
      <Dialog
        fullScreen
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
              {listFull.name}
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={2}>
            {listFull.list.map((food:Food) => (
              <Grid item  key={food.id} xs={3}>
              <FoodCardExpand 
                    id={food.id}
                    name={food.name}
                    price={food.price}
                    description={food.description}
                    img={food.img}
                    tags={food.tags}
                    quantity={0}/>
            </Grid>
            ))}
        </Grid>
      </Dialog>
    </div>
  );
}

export default Modal;