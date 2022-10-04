import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import {Typography, Grid } from '@material-ui/core';
import { Box } from '@mui/material'
import './Footer.css'

function Footer() {
    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center" className='pos'>
                <Grid alignItems="center" item xs={12}>
                    <Box style={{ backgroundColor: "#8e24aa", height: "70px" }}>
                        <Box paddingTop={0} display="flex" alignItems="center" justifyContent="center">
                            <Typography variant="h5" align="center" gutterBottom style={{ color: "white" }}>Siga-nos nas redes sociais </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" justifyContent="center" >
                            <a href="https://github.com/FlavioMessias" target="_blank" rel="noopener noreferrer">
                                <GitHubIcon style={{ fontSize: 25, color: "white" }} />
                            </a>
                            <a href="https://www.instagram.com/flaviohmn/" target="_blank" rel="noopener noreferrer">
                                <InstagramIcon style={{ fontSize: 25, color: "white" }} />
                            </a>
                            <a href="https://www.linkedin.com/in/flaviohmneto/" target="_blank" rel="noopener noreferrer">
                                <LinkedInIcon style={{ fontSize: 25, color: "white" }} />
                            </a>
                        </Box>
                    </Box>
                    <Box style={{ backgroundColor: "#4a148c", height: "45px" }}>
                        <Box paddingTop={0}>
                            <Typography variant="subtitle2" align="center" gutterBottom style={{ color: "white" }} >© 2022 Copyright:</Typography>
                            <a target="_blank" href="https://github.com/FlavioMessias" rel="noopener noreferrer">
                                <Typography variant="subtitle2" gutterBottom style={{ color: "white" }} align="center">Flavio Messias</Typography>
                            </a>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Footer;