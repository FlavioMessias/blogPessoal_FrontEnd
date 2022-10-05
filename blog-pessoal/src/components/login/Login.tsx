import React, { ChangeEvent, useEffect, useState } from "react";
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { Link, useNavigate} from 'react-router-dom';
import { Box } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import UsuarioLogin from "../../model/UsuarioLogin";
import { login } from "../../services/Service";
import useLocalStorage from "react-use-localstorage"


interface State {
    password: string;
    showPassword: boolean;
}

function Login() {

    let navigate = useNavigate()
    const [token, setToken] = useLocalStorage('token')
    const [userLogin, setUserLogin] = useState<UsuarioLogin>({
      id: 0,
      nome: '',
      usuario: '',
      senha: '',
      foto: '',
      token: ''
    });
  
    function updateModel(event: ChangeEvent<HTMLInputElement>){
      setUserLogin({
        ...userLogin,
        [event.target.name]: event.target.value
      })
    }
  
    async function conectar(event: ChangeEvent<HTMLFormElement>){
      event.preventDefault();
      try{
        await login('usuarios/logar', userLogin, setToken)
  
        alert('Usuário Logado com Sucesso!!!');
      }catch(error){
        alert('Erro ao Logar!!! Verifique os dados e tente novamente.')
      }
    }
  
    useEffect(() => {
      if(token !== ''){
        navigate('/home')
      }
    }, [token])

    const [values, setValues] = React.useState<State>({
        password: '',
        showPassword: false,
    });

    const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
    <Grid alignItems='center' xs={6} justifyContent='center'>
        <Box paddingX={3}>
            <form onSubmit={conectar}>
                <Typography variant='h2'>Entrar</Typography>

                <TextField
                onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                value={userLogin.usuario}
                id="usuario"
                name="usuario"
                label="Usuário"
                variant="outlined"
                fullWidth
                margin="normal"
              />
                <FormControl fullWidth margin='normal' variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
          <OutlinedInput
            id="senha"
            name='senha'
            type={values.showPassword ? 'text' : 'password'}
            value={userLogin.senha}
            onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
                <Box marginTop={2}>
                  <Button type='submit' variant='contained' color='primary'>Entrar</Button>
                </Box>
            </form>
                <Box display='flex' justifyContent='center' marginTop={1}>
                    <Box marginRight={1}>
                        <Typography variant='subtitle1' gutterBottom align='center' >Ainda não tem uma conta?</Typography>
                    </Box>
                    <Box>
                    <Link to="/cadastrar" style={{ textDecoration: "none" }}>
                <Typography>Cadastre-se</Typography>
              </Link>
                    </Box>
                </Box>
        </Box>
    </Grid>
    <Grid xs={6} style={{
        backgroundImage: `url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5b19eaca-3d5b-429c-8725-0539d5300693/deh94rs-e0a264b6-bdd4-446e-97eb-a825c5744d3c.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzViMTllYWNhLTNkNWItNDI5Yy04NzI1LTA1MzlkNTMwMDY5M1wvZGVoOTRycy1lMGEyNjRiNi1iZGQ0LTQ0NmUtOTdlYi1hODI1YzU3NDRkM2MuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.w0c4m4tMQmRe8yI5z8vzxCPqQz8nM4LDYBmJm1NKaeE)`,
        backgroundRepeat: 'no-repeat', width: '90vh', minHeight: '90vh', backgroundSize: 'cover', backgroundPosition: 'center'
    }}>
    </Grid>
</Grid>
);
}

export default Login