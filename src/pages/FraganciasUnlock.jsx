/*import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

function Fragancias() {
  const [fragancias, setFragancias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://6829df1bab2b5004cb350975.mockapi.io/Unlock')
      .then((res) => res.json())
      .then((data) => setFragancias(data))
      .catch((error) => console.error('Error al obtener fragancias:', error));
  }, []);

  return (
    
    <Container className="my-5">
      <Row className="justify-content-center">
        {fragancias.map((item) => (
          <Col md={3} key={item.id} className="mb-4 p-0">
            <div className="d-flex flex-column h-100" style={{ border: '1px solid #ccc' }}>
              <img
                src={item.imagen}
                alt={item.nombre}
                style={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <Button
                variant="primary"
                onClick={() => navigate(`/DetalleFragancia/${item.id}`)}
                className="w-100 rounded-0"
                style={{
                  padding: '12px 0',
                  fontSize: '16px',
                  margin: 0,
                  borderTop: '1px solid #ccc'
                }}
              >
                {item.nombre}
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Fragancias;*/
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { CartContext } from './CartContext'; 
import { ToastContainer, toast } from 'react-toastify';

function Fragancias() {
  const [fragancias, setFragancias] = useState([]);
  const navigate = useNavigate();
  const { agregarAlCarrito } = useContext(CartContext); // 👈 Usamos el contexto

  useEffect(() => {
    fetch('https://6829df1bab2b5004cb350975.mockapi.io/Unlock')
      .then((res) => res.json())
      .then((data) => setFragancias(data))
      .catch((error) => console.error('Error al obtener fragancias:', error));
  }, []);

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        {fragancias.map((item) => (
          <Col md={3} key={item.id} className="mb-4">
            <div className="position-relative overflow-hidden rounded shadow-sm group">
              <img
                src={item.imagen}
                alt={item.nombre}
                className="w-100"
                style={{
                  height: '250px',
                  objectFit: 'cover',
                  transition: 'all 0.3s ease',
                }}
              />

              {/* Botones flotantes */}
              <div
                className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-dark bg-opacity-50 opacity-0 group-hover-opacity transition"
                style={{ transition: 'opacity 0.3s ease' }}
              >
                <Button
                  variant="light"
                  size="sm"
                  className="mb-2"
                  onClick={() => navigate(`/DetalleFragancia/${item.id}`)}
                >
                  Ver más
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => {
                    agregarAlCarrito(item); // 👈 Se agrega al carrito desde el contexto
                    toast.success('Producto agregado al carrito 🎉');
                  }}
                >
                  Agregar al carrito
                </Button>
              </div>
            </div>

            <div className="text-center mt-2 fw-bold">{item.nombre}</div>
          </Col>
        ))}
      </Row>

      <ToastContainer />

      <style jsx>{`
        .group:hover .group-hover-opacity {
          opacity: 1 !important;
        }
      `}</style>
    </Container>
  );
}

export default Fragancias;
