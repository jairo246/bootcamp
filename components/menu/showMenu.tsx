import {Food, ShowFood} from "./interfaceMenu"
import Button from '@mui/material/Button';
import Image from 'next/image'
import FoodCardExpand from "../transitions/foodCardExpand";
import Grid from '@mui/material/Grid';


const ShowMenu = ({
  list,
  name,
  setOpen,
  setListFull
}:ShowFood) =>{

  const handleClickOpen = () => {
    setOpen(true);
    setListFull({list: list, name:name });
    
  };

    return (
      <Grid>
        <h1>{name}</h1>
        {list.length >3 ?
        <Grid container spacing={2}>
            <Grid item xs={3}>
            <FoodCardExpand 
                id = {list[0].id}   name = {list[0].name}
                price = {list[0].price} description = {list[0].description}
                img = {list[0].img} tags = {list[0].tags} quantity={0}/>
            </Grid>
            <Grid item xs={3}>
            <FoodCardExpand 
                id = {list[1].id}   name = {list[1].name}
                price = {list[1].price} description = {list[1].description}
                img = {list[1].img} tags = {list[1].tags} quantity={0}/>
            </Grid>
            <Grid item xs={3}>
            <FoodCardExpand 
                id = {list[2].id}   name = {list[2].name}
                price = {list[2].price} description = {list[2].description}
                img = {list[2].img} tags = {list[2].tags} quantity={0}/>
            </Grid>
            <Grid item xs={3}>
            <Button variant="outlined" onClick={handleClickOpen}>
                      Ver mas
            </Button>
            </Grid>
        </Grid>
        :
        <Grid container spacing={2}>
            {list.map((food:Food) => (
              <Grid item xs={3} key={food.id}>
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
        </Grid>}
    </Grid>
    )
  }
  export default ShowMenu;