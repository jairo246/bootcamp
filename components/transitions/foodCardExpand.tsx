import * as React from 'react';
import { styled } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import {Food} from '../menu/interfaceMenu';
import { FoodOrder } from '../orders/interfaceOrders';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

 const FoodCardExpand = ({
      id,
      name,
      price,
      description,
      img,
      tags,
      quantity}:FoodOrder) => {

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

    /**  <img src={foodList[0].img} width="100" height="100"></img>
      <Image src={foodList[0].img} width="100" height="100"></Image>*/

  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 300,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={img} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {name}
              </Typography>
            </Grid>
            <Grid item>
              {quantity == 0 ?
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
              ${price}
              </Typography>
              :
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
              Cantidad:{quantity}
              </Typography>
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {description}
          </Typography>
          <Typography paragraph>
            {tags?.map((tag) => tag)}
          </Typography>
        </CardContent>
      </Collapse>
  </Paper>
  );
}

export default FoodCardExpand;
