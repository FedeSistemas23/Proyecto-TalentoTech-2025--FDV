import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Menu from './components/Menu'
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Contacto from './pages/Contacto';
import Perfumeria from './pages/Perfumeria';
import Administracion from './pages/Admin';
import RutaProtegida from './components/RutaProtegidas';
import Unlock from './pages/Unlock'
import Coraje from './pages/Coraje'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Menu />
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/perfumeria" element={<Perfumeria />} />
                <Route path="/unlock" element={<Unlock />} />
                <Route path="/coraje" element={<Coraje />} />
                <Route path="/login" element={<Login />} />
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