import {User,UsersList} from "./interfaceUsers"
import Image from 'next/image'
import UserCardExpand from "../transitions/userCardExpand";
import { Grid } from "@mui/material"

const ShowUser = ({
    list,
    name
}:UsersList) =>{

  /**  <img src={foodList[0].img} width="100" height="100"></img>
      <Image src={foodList[0].img} width="100" height="100"></Image>*/

    return (
      <ul>
      <h1>{name}</h1>
      <Grid container spacing={2}>
            {list.map((user:User) => (
              <Grid item xs={3} key={user.id}>
              <UserCardExpand 
                    id = {user.id}
                    name = {user.name}
                    username = {user.username}
                    birthday = {user.birthday}
                    email = {user.email}
                    phone = {user.phone}
                    roles = {user.roles}
                    img = {user.img}/>
            </Grid>
            ))}
        </Grid>
      
  </ul>  
    )
  }
  export default ShowUser;