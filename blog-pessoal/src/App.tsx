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
import CadastroPost from './components/postagens/cadastroPost/CadastroPost';
import DeletarPost from './components/postagens/deletarPost/DeletarPost';
import CadastroTema from './components/temas/cadastroTema/CadastroTema';
import DeletarTema from './components/temas/deletarTema/DeletarTema';


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

        <Route path="/postagens" element={<ListaPostagem />} />

        <Route path="/Postagem" element={<CadastroPost />} />

        <Route path="/formularioPostagem/:id" element={<CadastroPost />} />

        <Route path="/formularioTema" element={<CadastroTema />} />

        <Route path="/formularioTema/:id" element={<CadastroTema />} />

        <Route path="/deletarPostagem/:id" element={<DeletarPost />} />

        <Route path="/deletarTema/:id" element={<DeletarTema />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
