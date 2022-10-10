import React, { useEffect, useState } from 'react'
import {Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import {Box} from '@mui/material'
import './DeletarTema.css';
import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import Tema from '../../../model/Tema';
import { buscaId, deleteId } from '../../../services/Service';





function DeletarTema() {
  let navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [token] = useLocalStorage('token');

  useEffect(() => {
      if (token === '') {
          alert("Erro de conexão, realize o Login novamente")
          navigate("/login")
      }
  }, [token])

  const [temas, setTemas] = useState<Tema>()

  async function temaById(id: string) {
    buscaId(`/temas/${id}`, setTemas, {
        headers: {
          'Authorization': token
        }
      })
    }


  useEffect(() =>{
    if(id !== undefined){
        temaById(id)
    }
}, [id])

    function sim() {
        navigate('/temas')
        deleteId(`/temas/${id}`, {
          headers: {
            'Authorization': token
          }
        });
        alert('Tema deletado com sucesso');
      }
    
      function nao() {
        navigate('/temas')
      }
        
return (
  <>
    <Box m={2}>
      <Card variant="outlined">
        <CardContent>
          <Box justifyContent="center">
            <Typography color="textSecondary" gutterBottom>
              Deseja deletar o Tema:
            </Typography>
            <Typography color="textSecondary">
              {temas?.descricao}
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
            <Box mx={2}>
              <Button onClick={sim} variant="contained" className="marginLeft" size='large' color="primary">
                Sim
              </Button>
            </Box>
            <Box mx={2}>
              <Button  onClick={nao} variant="contained" size='large' color="secondary">
                Não
              </Button>
            </Box>
          </Box>
        </CardActions>
      </Card>
    </Box>
  </>
);
}
export default DeletarTema;