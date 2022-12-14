  import React, { ChangeEvent, useEffect, useState } from 'react';
  import {Button,Container,FormControl,FormHelperText,InputLabel,MenuItem,Select,TextField,Typography} from '@mui/material';
  import { useNavigate, useParams } from 'react-router-dom';
  import Postagem from '../../../model/Postagem';
  import Tema from '../../../model/Tema';
  import { busca, buscaId, post, put } from '../../../services/Service';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
  
  function CadastroPostagem() {
    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [temas, setTemas] = useState<Tema[]>([]);
    const token = useSelector<TokenState, TokenState['tokens']>(
      (state)=> state.tokens
    ) 

    const [tema, setTema] = useState<Tema>({
      id: 0,
      descricao: '',
    });
  
    const [postagens, setPostagens] = useState<Postagem>({
      id: 0,
      titulo: '',
      texto: '',
      data: '',
      tema: null,
      usuario: null
    });
  
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
        navigate('/login');
      }
    }, [token]);
  
    useEffect(() => {
      setPostagens({
        ...postagens,
        tema: tema,
      });
    }, [tema]);

    useEffect(() => {
      getTemas()
      if (id !== undefined) {
          findByIdPostagens(id)
      }
  }, [id])
  
    async function findByIdPostagens(id: string) {
      await buscaId(`postagens/${id}`, setPostagens, {
        headers: {
          Authorization: token,
        },
      });
    }
  
    useEffect(() => {
      getTemas();
      if (id !== undefined) {
        findByIdPostagens(id);
      }
    }, [id]);
  
    async function getTemas() {
      await busca('/temas', setTemas, {
        headers: {
          Authorization: token,
        },
      });
    }
  
    function updatedPostagens(event: ChangeEvent<HTMLInputElement>) {
      setPostagens({
        ...postagens,
        [event.target.name]: event.target.value,
        tema: tema,
      });
    }
  
    async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
      event.preventDefault();
  
      if (id !== undefined) {
        put(`/postagens`, postagens, setPostagens, {
            headers: {
                'Authorization': token
            }
        })
        toast.success('Postagem atualizada com Sucesso!!!', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: 'colored',
          progress: undefined,
        });
    } else {
        post(`/postagens`, postagens, setPostagens, {
            headers: {
                'Authorization': token
            }
        })
        toast.success('Postagem cadastrada com Sucesso!!!', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: 'colored',
          progress: undefined,
        });
    }
    back()

}

function back() {
  navigate('/postagens')
}
  
    return (
      <Container maxWidth="sm" className="topo">
      <form onSubmit={onSubmit}>
          <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro postagem</Typography>
          <TextField value={postagens.titulo} onChange={(event: ChangeEvent<HTMLInputElement>) => updatedPostagens(event)} id="titulo" label="titulo" variant="outlined" name="titulo" margin="normal" fullWidth />
          <TextField value={postagens.texto} onChange={(event: ChangeEvent<HTMLInputElement>) => updatedPostagens(event)} id="texto" label="texto" name="texto" variant="outlined" margin="normal" fullWidth />

          <FormControl >
              <InputLabel id="demo-simple-select-helper-label">Tema </InputLabel>
              <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  onChange={(e) => buscaId(`/temas/${e.target.value}`, setTema, {
                      headers: {
                          'Authorization': token
                      }
                  })}>
                  {
                      temas.map(tema => (
                          <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
                      ))
                  }
              </Select>
              <FormHelperText>Escolha um tema para a postagem</FormHelperText>
              <Button type="submit" variant="contained" color="primary">
                  Finalizar
              </Button>
          </FormControl>
      </form>
  </Container>
)
}
  
  export default CadastroPostagem;