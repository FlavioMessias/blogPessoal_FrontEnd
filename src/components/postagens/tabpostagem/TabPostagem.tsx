import { TabContext, TabPanel } from '@material-ui/lab';
import { AppBar, Tabs, Tab, Box, Typography } from '@mui/material';
import React, { useState } from 'react'
import ListaPostagem from '../listapostagem/ListaPostagem';

function TabPostagens() {
  const [value, setValue] = useState('1')
    function handleChange(event: React.ChangeEvent<{}>, newValue: string){
        setValue(newValue);
    }
  return (
    <>
      <TabContext value={value} >
        <AppBar position="static" >
          <Tabs centered indicatorColor="primary"  onChange={handleChange} className= 'css-hip9hq-MuiPaper-root-MuiAppBar-root'>
            <Tab label="Todas as postagens" value="1" className='titulo' />
            <Tab label="Sobre-nós" value="2" className='titulo'  />
          </Tabs>
        </AppBar>
        <TabPanel value="1">
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            <ListaPostagem />
          </Box>
        </TabPanel>
        <TabPanel value="2" >
          <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className="titulo">Sobre-nós</Typography>
          <Typography variant="body1" gutterBottom color="textPrimary" align="justify">Sobre nós aqui</Typography>
        </TabPanel>
      </TabContext>
       
    </>
  )
}

export default TabPostagens