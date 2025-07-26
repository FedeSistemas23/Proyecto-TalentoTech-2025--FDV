import React, { createContext, useContext } from "react";
import { Nav, NavDropdown, Button, Container, Navbar, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../pages/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaShoppingCart } from 'react-icons/fa'; // Ícono de carrito
import { CartContext } from "../pages/CartContext";


export default function Menu() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { carrito, vaciarCarrito } = useContext(CartContext);
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  


  const cerrarSesion = () => {
    logout();
    vaciarCarrito();
    navigate('/login');
  };

  const linkStyle = { color: 'white', fontWeight: '500' };

  return (
    <Navbar expand="lg" variant="dark"
      style={{
        background: 'linear-gradient(90deg, #d63384, #e83e8c, #f06595)',
      }}
    >
      <Container>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/" style={linkStyle}>Inicio</Nav.Link>

            <NavDropdown
              title={<span style={linkStyle}>Productos</span>}
              id="productos-dropdown"
            >
              <NavDropdown.Item as={Link} to="/perfumeria">Perfumería</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/unlock" style={linkStyle}>Unlock</Nav.Link>
            <Nav.Link as={Link} to="/Coraje" style={linkStyle}>Equipo Coraje</Nav.Link>
            <Nav.Link as={Link} to="/contacto" style={linkStyle}>Contacto</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center">
            <Link to="/carrito" className="text-white position-relative me-4">
              <FaShoppingCart size={24} />
              {totalItems > 0 && (
                <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                  {totalItems}
                </Badge>
              )}
            </Link>
          </div>
          <div className="d-flex align-items-center">
            {/* Link Gestión de Productos solo si está logueado */}
            {user === "admin" && (
              <div style={{ marginRight: '15px' }}>
                <Nav.Link as={Link} to="/CrudProductos" style={linkStyle}>
                  Gestión de Productos
                </Nav.Link>
              </div>
            )}

            <Nav>
              {!user ? (
                <Nav.Link as={Link} to="/login" style={linkStyle}>Login</Nav.Link>
              ) : (
                <Button variant="outline-light" onClick={cerrarSesion}>
                  Cerrar sesión ({user})
                </Button>
              )}
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


