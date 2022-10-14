import React, {useState, useEffect, ChangeEvent} from 'react'
import { Container, Typography, TextField, Button } from "@material-ui/core"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import Tema from '../../../model/Tema';
import { buscaId, post, put } from '../../../services/Service';
import './CadastroTema.css';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';



function CadastroTema() {
let navigate = useNavigate();
const token = useSelector<TokenState, TokenState['tokens']>(
  (state)=> state.tokens
) 
const {id} = useParams<{id: string}>();
const [temas, setTemas] = useState<Tema>({
    id: 0,
    descricao: ''
})

    useEffect(() => {
        if (token === ''){
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
            put(`/temas`, temas, setTemas, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('Tema atualizado com sucesso!!!', {
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
            post(`/temas`, temas, setTemas, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('Tema cadastrado com sucesso!!!', {
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
            <Link to="/temas" className='tdn'>
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