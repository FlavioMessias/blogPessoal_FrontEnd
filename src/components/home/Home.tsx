import React, { useEffect } from 'react';
import './Home.css';
import { Grid, Box, Button, Typography } from '@mui/material';
import ModalPost from '../../components/postagens/modalPost/ModalPost';
import TabPostagens from '../postagens/tabpostagem/TabPostagem';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TokenState } from '../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';



function Home(){

  let navigate = useNavigate();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state)=> state.tokens
  )

  useEffect(() => {
    if(token === ''){
      toast.error('Erro de conexão, realize o Login novamente', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'colored',
        progress: undefined,
      });
      navigate('/login');
    }
  }, [token]);


    return (
        <>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid alignItems="center" item xs={6}>
            <Box paddingX={20} >
              <Typography className='titulo' variant="h3" gutterBottom color="textPrimary" component="h3" align="center" style={{ color: "chartreuse", fontWeight: "bold" }}>Code House</Typography>
              <Typography className='corpo' variant="h5" gutterBottom color="textPrimary" component="h5" align="center" style={{ color: "darkmagenta", fontWeight: "bold" }}>Seja bem vindo(a)!!</Typography>
            </Box>
            <Box display="flex" justifyContent="center">
              <Box marginRight={1}>
                <ModalPost/>
              </Box>
              <Link to='/postagens' className='tdn' >
              <Button variant="outlined" style={{ borderColor: "white", backgroundColor: "#3F51B5", color: "white" }}>Ver Postagens</Button>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={6} >
            <img className='br' src="data:image/jpeg;base64,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" alt="Olhos de Dragão" />
          </Grid>
          <Grid xs={12} style={{ backgroundColor: "white" }}>
          </Grid>
        </Grid>
  
        <Grid container justifyContent='center' alignItems='center'>
          <TabPostagens />
        </Grid>
      </>
    );
  }
  
  export default Home;