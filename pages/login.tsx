import { TextField, Typography } from '@mui/material';
import {Grid} from '@mui/material';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import Button from '@mui/material/Button';
import styles from '../styles/Home.module.css'
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { User } from '../components/users/interfaceUsers';
import { useAuth } from "../components/context/user/userContext";

interface Login {
  name: string;
  password: string;
  showPassword: boolean;
}

interface MyToken {
  name: string;
  exp: number;
}

const Login = () => {

  const { auth, err, rigth } = useAuth();
  const [values, setValues] = useState<Login>({
    name: "madonna",
    password: "mad0nna",
    showPassword: false,
  });

  const handleChange = (prop: keyof Login) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const verifyPerson = async () => {

    const data = {
        grant_type: "client_credentials",
        audience: "https://escalab.academy",
        client_id: values.name,
        client_secret: values.password
       };

    const requestOptionsToken: RequestInit = {
      method: 'POST',
      body: JSON.stringify(data)
  };

    try {
      const resToken = await fetch('https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/oauth/token', requestOptionsToken)
      
      const rToken = await resToken.json();
      const token = rToken.access_token;
      const name = jwt_decode<MyToken>(token).name;
      const tokenType = 'Bearer';
      const acceso = tokenType + " " + token;

      const myHeaders = new Headers();

      myHeaders.append("Authorization", acceso);
      const requestOptions: RequestInit = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
      };  

      const resUsers = await fetch('https://maf2qxs1f6.execute-api.us-east-1.amazonaws.com/prod/api/users', requestOptions)

      const users = await resUsers.json();
      const user = users.find((user:User) => user.name === name);

      //console.log(token);
      //console.log(user.name);
      //console.log(user.img);
      //console.log(user.roles[0]);

      rigth(token, user.name, user.img, user.roles[0]);
      
    } catch (error) {

          console.log(error);
        err() 
      
    }
}

  return (

        <div className={styles.container}>

          <main >
            <Grid  mt={10} ml={25} sx={{
              bgcolor: 'background.paper',
              boxShadow: 1,
              borderRadius: 2,
              p: 2,
              maxWidth: 600,
            }}
                container spacing={3}
                direction="column"
                justifyContent="center"
                alignItems="center">

                <Grid item xs={6}>
                  <TextField 
                    id="name" 
                    label="Nombre" 
                    variant="outlined" 
                    value={values.name}
                    onChange={(event) => setValues({...values,name:event.target.value})}/>
                </Grid>
                <Grid item xs={6}>
                <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password">
                    Password
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                </Grid>
                  <Grid item xs={6}>
                    <Button disabled={auth.breck} onClick={verifyPerson} >
                      <Typography>
                          Verificar
                      </Typography>
                    </Button>
                  </Grid>
            </Grid>
          </main>
        </div>   
  )
}

export default Login;