import React, { createContext, useContext } from "react";
import { Nav, NavDropdown, Button, Container, Navbar, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaShoppingCart } from 'react-icons/fa'; // Ícono de carrito
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartContext } from "../pages/CartContext";


export default function Menu() {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem('auth') === 'true';
  const { carrito } = useContext(CartContext);
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);


  const cerrarSesion = () => {
    localStorage.removeItem('auth');
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
              <NavDropdown.Item as={Link} to="perfumeria">Perfumería</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/unlock" style={linkStyle}>Unlock</Nav.Link>
            <Nav.Link as={Link} to="/Coraje" style={linkStyle}>Equipo Coraje</Nav.Link>
            <Nav.Link as={Link} to="/contacto" style={linkStyle}>Contacto</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center">
            <Link to="/carrito" className="text-white position-relative">
              <FaShoppingCart size={24} />
              {totalItems > 0 && (
                <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                  {totalItems}
                </Badge>
              )}
            </Link>
          </div>
          
          <Nav>
            {!isAuth ? (
              <Nav.Link as={Link} to="/login" style={linkStyle}>Login</Nav.Link>
            ) : (
              <Button variant="outline-light" onClick={cerrarSesion}>
                Cerrar sesión
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


