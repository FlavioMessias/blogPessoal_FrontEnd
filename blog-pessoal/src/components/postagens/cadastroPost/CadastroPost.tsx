  import React, { ChangeEvent, useEffect, useState } from 'react';
  import {Button,Container,FormControl,FormHelperText,InputLabel,MenuItem,Select,TextField,Typography} from '@mui/material';
  import { useNavigate, useParams } from 'react-router-dom';
  import useLocalStorage from 'react-use-localstorage';
  import Postagem from '../../../model/Postagem';
  import Tema from '../../../model/Tema';
  import { busca, buscaId, post, put } from '../../../services/Service';
  
  function CadastroPostagem() {
    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [temas, setTemas] = useState<Tema[]>([]);
    const [token] = useLocalStorage('token');
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
        alert('Erro de conexão, realize o Login novamentem');
        navigate('/login');
      }
    }, [token]);
  
    useEffect(() => {
      setPostagens({
        ...postagens,
        tema: tema,
      });
    }, [temas]);
  
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
        try {
          await put(`/postagens`, postagens, setPostagens, {
            headers: {
              Authorization: token,
            },
          });
          alert('Postagem atualizada com sucesso!!!');
        } catch (error) {
          alert('Erro ao atualizar, verifique os campos');
        }
      } else {
        try {
          await post(`/postagem`, postagens, setPostagens, {
            headers: {
              Authorization: token,
            },
          });
          alert('Postagem cadastrada com sucesso');
        } catch (error) {
          alert('Erro ao cadastrar, verifique os campos');
        }
      }
      navigate('/postagens');
    }
  
    return (
      <>
        <Container>
          <form onSubmit={onSubmit}>
            <Typography
              variant="h3"
              color="textSecondary"
              component="h1"
              align="center"
            >
              Formulário de cadastro postagem
            </Typography>
  
            <TextField
              value={postagens.titulo}
              onChange={(event: ChangeEvent<HTMLInputElement>) => updatedPostagens(event)}
              id="titulo"
              label="titulo"
              variant="outlined"
              name="titulo"
              margin="normal"
              fullWidth
            />
  
            <TextField
              value={postagens.texto}
              onChange={(event: ChangeEvent<HTMLInputElement>) => updatedPostagens(event)}
              id="texto"
              label="texto"
              name="texto"
              variant="outlined"
              margin="normal"
              fullWidth
            />
  
            <FormControl variant='outlined'>
              <InputLabel id="demo-simple-select-helper-label">Tema </InputLabel>
  
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                fullWidth
                
                onChange={(event) =>
                  buscaId(`/temas/${event.target.value}`, setTema, {
                    headers: {
                      Authorization: token,
                    },
                  })
                }
              >
                {temas.map((item) => (
                  <MenuItem value={item.id} style={{display: 'block'}}>{item.descricao}</MenuItem>
                ))}
              </Select>
              <FormHelperText>Escolha um tema para a postagem</FormHelperText>
              <Button type="submit" variant="contained" color="primary">
                Finalizar
              </Button>
            </FormControl>
          </form>
        </Container>
      </>
    );
  }
  
  export default CadastroPostagem;