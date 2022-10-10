import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import './ListaPostagem.css';
import {Grid, Box } from '@mui/material';
import useLocalStorage from 'react-use-localstorage';
import { busca } from '../../../services/Service';
import Postagem from '../../../model/Postagem';

function ListaPostagem() {

let navigate = useNavigate();
const [postagens, setPostagens] = useState<Postagem[]>([])
const [token, setToken] = useLocalStorage('token');

useEffect(() => {
  if (token === ''){
    alert('Erro de conexão, realize o Login novamente')
    navigate('/login')
  }
}, [token])

async function getPostagens() {
  await busca("/postagens", setPostagens, {
      headers: {'Authorization': token}
    })
}

useEffect(() => {
  getPostagens()
}, [postagens.length])

  return (
    <Grid>
       {
        postagens.map(postagens => (
      <Box m={2} >
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Postagens
            </Typography>
            <Typography variant="h5" component="h2">
            {postagens.titulo}
            </Typography>
            <Typography variant="body2" component="p">
            {postagens.texto}
            </Typography>
            <Typography variant="body2" component="p">
            {postagens.tema?.descricao}
            </Typography>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="center" mb={1.5}>

              <Link to={`/formularioPostagem/${postagens.id}`} className="text-decorator-none" >
                <Box mx={1}>
                  <Button variant="contained" className="marginLeft" size='small' color="primary" >
                    atualizar
                  </Button>
                </Box>
              </Link>
              <Link to={`/deletarPostagem/${postagens.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" size='small' color="secondary">
                    deletar
                  </Button>
                </Box>
              </Link>
            </Box>
          </CardActions>
        </Card>
      </Box>
              ))
            }
      </Grid>)
}

export default ListaPostagem;