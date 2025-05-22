import { Nav, NavDropdown, Button, Container, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaShoppingCart } from 'react-icons/fa'; // Ícono de carrito

export default function Menu() {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem('auth') === 'true';

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
              <NavDropdown.Item as={Link} to="/productos/cosmetica">Cosmética</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/productos/perfumeria">Perfumería</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/unlock" style={linkStyle}>Unlock</Nav.Link>
            <Nav.Link as={Link} to="/magenta" style={linkStyle}>Magenta</Nav.Link>
            <Nav.Link as={Link} to="/conocenos" style={linkStyle}>Conocenos</Nav.Link>
            <Nav.Link as={Link} to="/contacto" style={linkStyle}>Contacto</Nav.Link>
          </Nav>            
            <Nav>
              <Nav.Link as={Link} to="/carrito" style={linkStyle}>
                <FaShoppingCart size={22} style={{ marginRight: '5px' }} />
              </Nav.Link>
            </Nav>          
          <Nav>
            {isAuth && (
              <>
                <Nav.Link as={Link} to="/perfil/usuario123" style={linkStyle}>Perfil</Nav.Link>
                <Nav.Link as={Link} to="/admin" style={linkStyle}>Admin</Nav.Link>
              </>
            )}
          </Nav>
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


