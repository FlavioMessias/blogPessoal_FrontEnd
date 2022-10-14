import React, { useEffect, useState } from 'react'
import {Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import {Box} from '@mui/material'
import './DeletarTema.css';
import { useNavigate, useParams } from 'react-router-dom';
import Tema from '../../../model/Tema';
import { buscaId, deleteId } from '../../../services/Service';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


function DeletarTema() {
  let navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
 const token = useSelector<TokenState, TokenState['tokens']>(
  (state)=> state.tokens
) 
  const [temas, setTemas] = useState<Tema>()

  useEffect(() => {
      if (token === '') {
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
          navigate("/login")
      }
  }, [token])

  useEffect(() => {
    if(id !== undefined) {
      findById(id)
    }
  },[id])

  async function findById(id: string){
    await buscaId(`/temas/${id}`, setTemas, {
      headers: {
        'Authorization': token
      }
    })
  }

  async function sim() {
    await deleteId(`/temas/${id}`, {
      headers: {
        'Authorization': token
      }
    })
    toast.success('Tema deletado!!!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: 'colored',
      progress: undefined,
    });
    navigate('/temas')
  }

  function nao(){
    navigate('/temas')
  }

  return (
      <Box m={2}>
        <Card variant='outlined'>
          <CardContent>
            <Box justifyContent='center'>
              <Typography color='textSecondary' gutterBottom>Deseja deletar o tema: </Typography>
              <Typography color='textSecondary'>{temas?.descricao} </Typography>
            </Box>
          </CardContent>

          <CardActions>
            <Box display='flex' justifyContent='start' ml={1} mb={2}>
              <Box mx={2}>
                <Button onClick={sim} variant='contained' size='large' color='primary' className='marginLeft'>Sim</Button>
              </Box>
              <Box mx={2}>
                <Button onClick={nao} variant='contained' size='large' color='secondary'>Não</Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    
  )
}

export default DeletarTema