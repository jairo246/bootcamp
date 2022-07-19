import type {  GetServerSideProps, GetStaticProps  } from 'next'
import Image from 'next/image';
import {Users,User} from '../components/users/interfaceUsers'
import ShowUser from '../components/users/showUser'
import { useAuth } from '../components/context/user/userContext'

const Users = (props:Users) => {

  const {auth} = useAuth();

  return (
    <>
    {auth.role == "" ? <Image src="http://ramosmerino.cl/gen6/te.jpeg" layout="fill"></Image> :
      <main >
            <ShowUser list={props.admin} name="Administrador" />
            <ShowUser list={props.waiter} name="Camarero" />
      </main>
    }
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {

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
        

        const resUsers = await fetch('https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/api/users', requestOptions)

        const users = await resUsers.json();

        const admin = users.filter((user:User) => user.roles[0] == 'admin');
        const waiter = users.filter((user:User) => user.roles[0] == 'user');

        return {
          props:{admin: admin,
                waiter: waiter}
        }
        
      } catch (error) {

        return {
          props:{admin: [],
                 waiter: []}
        }
        
      } 
}

export default Users