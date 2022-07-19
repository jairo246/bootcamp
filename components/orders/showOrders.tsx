import {Order} from './interfaceOrders'
import { Grid } from '@mui/material';
import FoodCardExpand from '../transitions/foodCardExpand';
import Badge from '@mui/material/Badge';
import Chip from '@mui/material/Chip';
import format from 'date-fns/format';
import { FoodOrder } from './interfaceOrders';
import {Typography} from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import DoneIcon from '@mui/icons-material/Done';

const ShowOrders = ({
    id,
    created_at,
    waiter,
    table,
    available,
    order
}:Order) =>{

    return (

        <Grid mt={4} sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
        }}
            >
          <Grid container spacing={1}>
            <Grid item xs={1}>
              <Badge badgeContent={id} max={999} color="primary">
                <EastIcon color="action" />
              </Badge>
            </Grid>
            <Grid item xs={2}> 
                <Chip label={table} variant="outlined" />
            </Grid> 
            <Grid item xs={2}> 
                <Chip label={waiter} variant="outlined" />
            </Grid>
            <Grid item xs={3}> <Typography>{format(created_at,'MM/dd/yyyy')}</Typography> </Grid>             
            <Grid item xs={3}> <Typography>Disponible : {available?<DoneIcon/>:<DoDisturbIcon/>}</Typography></Grid>
        </Grid>
        <Grid container spacing={2}>
              {order.map((foodOrder:FoodOrder) => (
                <Grid item xs={3} key={foodOrder.id}>
                <FoodCardExpand 
                      id={foodOrder.id}
                      name={foodOrder.name}
                      price={foodOrder.price}
                      description={foodOrder.description}
                      img={foodOrder.img}
                      tags={foodOrder.tags}
                      quantity={foodOrder.quantity}/>
              </Grid>
              ))}
          </Grid>  
      </Grid>

    )
  }
  export default ShowOrders;