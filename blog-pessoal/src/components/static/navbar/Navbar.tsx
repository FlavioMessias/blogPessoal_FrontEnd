import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Open from './OpenMenu';
import './Navbar.css'
import { Box } from '@material-ui/core';
import useLocalStorage from 'react-use-localstorage';
import { useNavigate } from 'react-router-dom';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { useDispatch, useSelector } from 'react-redux';
import { addToken } from '../../../store/tokens/actions';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));







function Navbar() {
  let navigate = useNavigate();
  const token = useSelector<TokenState, TokenState['tokens']>(
    (state)=> state.tokens
  ) 

  const dispatch=useDispatch();

  const classes = useStyles();

  function goLogout() {
    dispatch(addToken(''))
      alert('Logout efetuado com sucesso!!')
      navigate('/login')

  }

  var navBarComponent

  if (token !== ''){
    navBarComponent =  <div className={classes.root} >
    <AppBar position='static' style={{backgroundColor:"#8e24aa"}} >
      <Toolbar>
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <Open />
        
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          BlogPessoal
        </Typography>
        <Button color="inherit" onClick={goLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  </div>
  }
  
 

  return (
    <>
    {navBarComponent}
    </>
   
  );
}
export default Navbar;