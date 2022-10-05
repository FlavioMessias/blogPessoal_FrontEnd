import React from 'react';
import ButtonAppBar from './components/static/navbar/Navbar';

import './App.css';
import ListaTema from './components/temas/listatema/ListaTema';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Navbar from './components/static/navbar/Navbar';
import Footer from './components/static/footer/Footer';
import Cadastrar from './components/cadastro/Cadastrar';
import ListaPostagem from './components/postagens/listapostagem/ListaPostagem';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/home" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/cadastrar" element={<Cadastrar />} />   

        <Route path="/temas" element={<ListaTema />} />

        <Route path="/posts" element={<ListaPostagem />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
