import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import './Navbar.css'
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

export default function Open() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
      <MenuIcon/>
      </Button>
      <Menu className='stile'
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <Link to='/home' className='text-decorator-none'>
        <MenuItem onClick={handleClose}>Home</MenuItem>
        </Link>

        <Link to='/postagens' className='text-decorator-none'>
        <MenuItem onClick={handleClose}>Postagens</MenuItem>
        </Link>

        <Link to='/temas' className='text-decorator-none'>
        <MenuItem onClick={handleClose}>Temas</MenuItem>
        </Link>

        <Link to='/formularioTema' className='text-decorator-none'>
        <MenuItem onClick={handleClose}>Cadastrar Tema</MenuItem>
        </Link>

      </Menu>
    </div>
  );
}