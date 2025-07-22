import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Menu from './components/Menu'
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import { AuthProvider } from "./pages/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import Contacto from './pages/Contacto';
import Perfumeria from './pages/Perfumeria';
import RutaProtegida from './components/RutaProtegidas';
import UnlockPromo from './pages/Unlock';
import Coraje from './pages/Coraje';
import Producto from './pages/DetalleProducto';
import Fragancias from './pages/FraganciasUnlock';
import DetalleFragancia from './pages/DetallesFraganciasUnlock';
import Carrito from './pages/Carrito';
import { CartProvider } from './pages/CartContext';
import CrudProductos from './pages/CrudProductos';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <BrowserRouter>
                    <Header />
                    <Menu />
                    <Routes>
                        <Route path="/" element={<Inicio />} />
                        <Route path="/perfumeria" element={<Perfumeria />} />
                        <Route path="/perfumeria/:id" element={<Producto />} />
                        <Route path="/unlock" element={<UnlockPromo />} />
                        <Route path="/fragancias" element={<Fragancias />} />
                        <Route path="/detallefragancia/:id" element={<DetalleFragancia />} />
                        <Route path="/coraje" element={<Coraje />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/CrudProductos" element={<ProtectedRoute><CrudProductos /></ProtectedRoute>} />
                        <Route path="/contacto" element={<Contacto />} />
                        <Route path="/carrito" element={<ProtectedRoute><Carrito /></ProtectedRoute>} />
                        <Route path="/crud" element={<CrudProductos />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    );
}
export default App; 