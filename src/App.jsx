import React from 'react';
import CustomNavbar from './components/Menu';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Menu from './components/Menu'
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Conocenos from './pages/Conocenos';
import Contacto from './pages/Contacto';
//import Productos from './pages/Productos';
import Administracion from './pages/Admin';
import RutaProtegida from './components/RutaProtegidas';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Menu />
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/login" element={<Login />} />
                <Route path="/conocenos" element={<Conocenos />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/perfil/:id" element={
                    <RutaProtegida><Perfil /></RutaProtegida>
                } />
                <Route path="/admin" element={
                    <RutaProtegida><Administracion /></RutaProtegida>
                } />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
export default App; 