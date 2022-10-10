import React, { useEffect, useState } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { Grid, Box } from '@mui/material';
import './ListaTema.css';
import Tema from '../../../model/Tema';
import useLocalStorage from 'react-use-localstorage';
import { busca } from '../../../services/Service';



function ListaTema() {

let navigate = useNavigate();
const [temas, setTemas] = useState<Tema[]>([]);
const [token, setToken] = useLocalStorage('token');

useEffect(() => {
    if (token === ''){
        alert('Erro de conexão, realize o Login novamente')
        navigate('/login')
    }
}, [token])

async function getTemas(){
    await busca('/temas', setTemas, {
        headers: {'Authorization': token}
    })
}

useEffect(() => {
    getTemas()
}, [temas.length])

return (
<Grid item xs={6}>
    {temas.map(temas => (
    <Box m={2} key={temas.id}>
        <Card variant="outlined">
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    Tema
                </Typography>

                <Typography variant="h5" component="h2">
                    {temas.descricao}
                </Typography>
            </CardContent>
            <CardActions>
                <Box display="flex" justifyContent="center" mb={1.5} >
            <Link to={'/formularioTema/${temas.id'} className="text-decorator-none">
                    <Box mx={1}>
                <Button variant="contained" className="marginLeft" size='small' color="primary" >
                    atualizar
                </Button>
                    </Box>
            </Link>
            <Link to={'/deletarTema/${temas.id'} className="text-decorator-none">
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
    ))}
</Grid>
);
}

export default ListaTema;