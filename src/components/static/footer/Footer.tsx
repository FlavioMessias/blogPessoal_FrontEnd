import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import {Typography, Grid } from '@material-ui/core';
import { Box } from '@mui/material'
import './Footer.css'
import { TokenState } from '../../../store/tokens/tokensReducer';
import { useSelector } from 'react-redux';


function Footer() {

const token = useSelector<TokenState, TokenState['tokens']>(
    (state)=> state.tokens
  ) 

 var footerComponent

if (token !== "") {
    footerComponent = <Grid container direction="row" justifyContent="center" alignItems="center" className='pos'>
    <Grid alignItems="center" item xs={12}>
        <Box style={{ backgroundColor: "#8e24aa", height: "70px" }}>
            <Box paddingTop={0} display="flex" alignItems="center" justifyContent="center">
                <Typography variant="h5" align="center" gutterBottom style={{ color: "white" }}>Siga-nos nas redes sociais</Typography>
            </Box>
            <Box className="icons" display="flex" justifyContent="center" >
                <a href="https://github.com/FlavioMessias" target="_blank" rel="noopener noreferrer"  className="icon icon--github">
                    <GitHubIcon/>
                    <i className="ri-github-line"></i>
                </a>
                <a href="https://www.instagram.com/flaviohmn/" target="_blank" className="icon icon--instagram">
                    <InstagramIcon/>
                    <i className="ri-instagram-line"></i>
                </a>
                <a href="https://www.linkedin.com/in/flaviohmneto/" target="_blank" className="icon icon--linkedin" >
                    <LinkedInIcon/>
                    <i className="ri-linkedin-line"></i>
                </a>
            </Box>
        </Box>
        <Box style={{ backgroundColor: "#4a148c", height: "50px" }}>
            <Box paddingTop={0}>
                <Typography variant="subtitle2" align="center" gutterBottom style={{ color: "white" }} >© 2022 Copyright:</Typography>
                <a target="_blank" href="https://github.com/FlavioMessias" rel="noopener noreferrer">
                    <Typography variant="subtitle2" gutterBottom style={{ color: "white" }} align="center">Flavio Messias</Typography>
                </a>
            </Box>
        </Box>
    </Grid>
</Grid>
}



    return (
        <>
           {footerComponent}
        </>
    )
}

export default Footer;