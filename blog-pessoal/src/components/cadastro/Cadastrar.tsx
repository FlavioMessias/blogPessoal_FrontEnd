import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, FormControlLabel, Grid, RadioGroup, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import User from "../../model/User";
import { cadastroUsuario } from "../../services/Service";
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import './Cadastrar.css'


interface State {
  password: string;
  showPassword: boolean;
}


function Cadastrar() {

  let navigate = useNavigate()
  const [confirmarSenha, setConfirmarSenha] = useState<String>('')
  const [userCadastrar, setUserCadastrar] = useState<User>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  const [userResult, setUserResult] = useState<User>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  function confirmarSenhaHandle(event: ChangeEvent<HTMLInputElement>){
    setConfirmarSenha(event.target.value)
  }

  function updateModel(event: ChangeEvent<HTMLInputElement>){
    setUserCadastrar({
      ...userCadastrar,
      [event.target.name]: event.target.value
    })
  }

  async function conectar(event: ChangeEvent<HTMLFormElement>){
    event.preventDefault();
    if(confirmarSenha == userCadastrar.senha){
      cadastroUsuario('usuarios/cadastrar', userCadastrar, setUserResult)
      
      alert('Usuário Cadastrado com Sucesso!')
    }
    else{
      alert('Erro!!! Favor verificar as informações de cadastro.')
    }
  }

  useEffect(() => {
    if(userResult.id !== 0){
      navigate('/login')
    }
  }, [userResult])


  const [values, setValues] = React.useState<State>({
    password: '',
    showPassword: false,
  });

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  return (
    <>
      <Grid container direction="row" alignItems="center" justifyContent="center">
      <Grid item xs={6} style={{
        backgroundImage: `url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5b19eaca-3d5b-429c-8725-0539d5300693/deh94rs-e0a264b6-bdd4-446e-97eb-a825c5744d3c.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzViMTllYWNhLTNkNWItNDI5Yy04NzI1LTA1MzlkNTMwMDY5M1wvZGVoOTRycy1lMGEyNjRiNi1iZGQ0LTQ0NmUtOTdlYi1hODI1YzU3NDRkM2MuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.w0c4m4tMQmRe8yI5z8vzxCPqQz8nM4LDYBmJm1NKaeE)`,
        backgroundRepeat: 'no-repeat', width: '90vh', minHeight: '90vh', backgroundSize: 'cover', backgroundPosition: 'center'
    }}>
    </Grid>

        <Grid item xs={6} alignItems="center" justifyContent="center">
          <Box padding={10}>
            <form onSubmit={conectar}>
              <Typography variant="h2">Cadastre-se</Typography>
              <TextField
                onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                value={userCadastrar.nome}
                id="nome"
                name="nome"
                label='Digite seu Nome'
                variant="outlined"
                fullWidth
                margin="normal"/>
              <TextField
                onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                value={userCadastrar.usuario}
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
                      type={values.showPassword ? 'text' : 'password'}
                onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                value={userCadastrar.senha}
                id="senha"
                name="senha"
                label="Senha"
                endAdornment={
<InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl fullWidth margin='normal' variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Confirmar Senha</InputLabel>
                     <OutlinedInput
                      type={values.showPassword ? 'text' : 'password'}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(event)}
                      value={confirmarSenha}
                id="confirmarSenha"
                name="confirmarSenha"
                label="Confirmar a Senha"
                endAdornment={
<InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
            <Box className="botao">
                <Link to='/login' className='text-decorator-none'>
                  <Button variant='contained' color='secondary' className='btnCancelar'>
                    Cancelar
                  </Button>
                </Link>
                <Button type="submit" variant="contained" color="primary">
                  Cadastrar
                </Button>
            </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Cadastrar;