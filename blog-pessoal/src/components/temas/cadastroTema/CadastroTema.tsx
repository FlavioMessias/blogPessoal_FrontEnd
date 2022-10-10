import React, {useState, useEffect, ChangeEvent} from 'react'
import { Container, Typography, TextField, Button } from "@material-ui/core"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import useLocalStorage from 'react-use-localstorage';
import Tema from '../../../model/Tema';
import { buscaId, post, put } from '../../../services/Service';
import './CadastroTema.css';



function CadastroTema() {
let navigate = useNavigate();
const [token] = useLocalStorage('token');
const {id} = useParams<{id: string}>();
const [temas, setTemas] = useState<Tema>({
    id: 0,
    descricao: ''
})

    useEffect(() => {
        if (token === ''){
          alert('Erro de conexão, realize o Login novamente')
          navigate('/login')
        }
      }, [token])

      async function temasById(id: string) {
        await buscaId(`/temas/${id}`, setTemas, {
          headers: { Authorization: token },
        });
      }
    
      useEffect(() => {
        if (id !== undefined) {
          temasById(id);
        }
      }, [id]);
    
      function updatedTema(event: ChangeEvent<HTMLInputElement>) {
        setTemas({
          ...temas,
          [event.target.name]: event.target.value,
        });
      }
    
      async function cadastrar(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault()
    
        console.log("tema " + JSON.stringify(temas))
    
        if (id !== undefined) {
            console.log(temas)
            put(`/tema`, temas, setTemas, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Tema atualizado com sucesso');
        } else {
            post(`/temas`, temas, setTemas, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Tema cadastrado com sucesso');
        }
        back()

    }

    function back() {
        navigate('/temas')
    }
    
    
    
      return (
        <>
        <Container maxWidth="sm">
        <form onSubmit={cadastrar}>
          <Typography variant="h3" component="h1">
            Novo tema
          </Typography>

          <TextField
            label="Nome do tema"
            value={temas.descricao}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updatedTema(event)
            }
            id="descricao"
            name="descricao"
            variant="outlined"
            margin="normal"
            fullWidth
          />

          <Box display="flex" justifyContent="space-around">
            <Link to="/temas">
              <Button  variant="contained" color="secondary">
                Cancelar
              </Button>
            </Link>
            <Button type="submit" variant="contained" color="primary">
              Cadastrar
            </Button>
          </Box>
        </form>
      </Container>
      </>
    );
}


export default CadastroTema;