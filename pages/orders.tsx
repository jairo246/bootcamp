import type {  GetStaticProps  } from 'next'
import {Food} from '../components/menu/interfaceMenu'
import ShowOrders from '../components/orders/showOrders'
import Image from 'next/image';
import {FoodRequest,OrderRequest,FoodOrder,Order,OrderList} from '../components/orders/interfaceOrders'
import {Grid} from '@mui/material'
import { Button } from '@mui/material'
import { useState } from 'react';
import { useAuth } from '../components/context/user/userContext'
import Modal from '../components/transitions/dialogSend'

const Orders = (props:OrderList) => {

  const [open, setOpen] = useState<boolean>(false);
  const {auth} = useAuth();

  const list = props.list.filter((order:Order) => {

    if(auth.role == "admin"){
        return 1;
    }
    else{

      if(order.waiter == auth.name){
          return 1;
      }
      else{
        return 0;
      }
    }
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
    {auth.role == "" ? <Image src="http://ramosmerino.cl/gen6/pan-pescado.jpg" layout="fill"/> :
      <main >
          <Button variant="outlined" onClick={handleClickOpen}>
                      Crear Orden
          </Button>

        {list.map((order:Order) => (

          <Grid key={order.id}>
            <ShowOrders 
                id={order.id}
                created_at={order.created_at}
                waiter={order.waiter}
                table={order.table}
                available={order.available}
                order={order.order}
                />
        </Grid>   
        ))}
        <Modal 
            open={open} 
            setOpen={setOpen}
        />        
      </main>
  }
  </>
  )
}


export const getStaticProps: GetStaticProps = async (context) => {

    const tokenType = 'Bearer'
    const accesToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiTWFkb25uYSIsInVzZXIiOiJtYWRvbm5hIiwicm9sZXMiOlsiYWRtaW4iXX0.5l4DWWWWhxarAzv9NIiUfoFYiSe6QpmjT2B1SkQjpV4';
  
    const acceso = tokenType + " " + accesToken;
  
    const myHeaders = new Headers();
    
    myHeaders.append("Authorization", acceso);
    const requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    
    try {

      const resOrders = await fetch('https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/api/orders', requestOptions)
      const resTable = await fetch('https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/api/tables', requestOptions)
      const resUsers = await fetch('https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/api/users', requestOptions)
      const resMenu = await fetch('https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/api/menus')

      const orders = await resOrders.json();
      const table = await resTable.json();
      const users = await resUsers.json();
      const menu = await resMenu.json();


      const foodList =menu.entradas.map((food:Food) => food);
      menu.ensaladas.map((food:Food) => foodList.push(food));
      menu.sandwichs.map((food:Food) => foodList.push(food));
      menu.fondo.map((food:Food) => foodList.push(food));
      menu.agregados.map((food:Food) => foodList.push(food));
      menu.postres.map((food:Food) => foodList.push(food));
      menu["jugos-bebidas"].map((food:Food) => foodList.push(food));


      const ordersList:Array<Order> = orders.map((order:OrderRequest) => {

          const foodOrders:Array<FoodOrder> = order.order.map((food:FoodRequest) => {

                return{
                  id: foodList[food.product-1].id,
                  name: foodList[food.product-1].name,
                  price: foodList[food.product-1].price,
                  description: foodList[food.product-1].description,
                  img: foodList[food.product-1].img,
                  quantity: food.quantity
                }
            });

            return{
              id: order.id,
              created_at: order.created_at,
              waiter: users[order.waiter-1].name,
              table: table[order.table-1].name,
              available: table[order.table-1].available,
              order: foodOrders
            }
      } );

    return {
      props:{list: ordersList}
    }

  } catch (error) {

    return {
      props:{list: []}
    }
          
  }
}

export default Orders