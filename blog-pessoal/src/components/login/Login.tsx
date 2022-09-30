import React from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';



function Login() {
  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
    <Grid alignItems='center' xs={6} justifyContent='center'>
        <Box paddingX={20}>
            <form>
                <Typography variant='h2'>Entrar</Typography>

                <TextField id='outlined-basic' label='Usuário' variant='outlined' fullWidth margin='normal'/>
                <TextField id='' label='Senha' variant='outlined' fullWidth margin='normal' />
                <Box marginTop={2} textAlign='center'>
                    <Link to='/home'><Button type='submit' variant='contained' color='primary'>Entrar</Button></Link>
                </Box>
            </form>
            <Box display='flex'>
                    <Typography>Ainda não tem uma conta?</Typography>
                    <Typography>Cadastre-se</Typography>
            </Box>
        </Box>
    </Grid>
    <Grid xs={6} style={{
        backgroundImage: `url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5b19eaca-3d5b-429c-8725-0539d5300693/deh94rs-e0a264b6-bdd4-446e-97eb-a825c5744d3c.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzViMTllYWNhLTNkNWItNDI5Yy04NzI1LTA1MzlkNTMwMDY5M1wvZGVoOTRycy1lMGEyNjRiNi1iZGQ0LTQ0NmUtOTdlYi1hODI1YzU3NDRkM2MuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.w0c4m4tMQmRe8yI5z8vzxCPqQz8nM4LDYBmJm1NKaeE)`,
        backgroundRepeat: 'no-repeat', width: '100vh', minHeight: '100vh', backgroundSize: 'cover', backgroundPosition: 'center'
    }}>

    </Grid>
</Grid>
);
}

export default Login