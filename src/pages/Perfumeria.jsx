import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Perfumeria = () => {
  const navigate = useNavigate();
  const [fragancias, setFragancias] = useState([]);
  const [mostrarMasculinos, setMostrarMasculinos] = useState(false);
  const [mostrarFemeninos, setMostrarFemeninos] = useState(false);
  const [descripcionExpandida, setDescripcionExpandida] = useState(null);
  const { agregarAlCarrito } = useContext(CartContext);

  useEffect(() => {
    fetch('https://6829df1bab2b5004cb350975.mockapi.io/imagenesBagues')
      .then(res => res.json())
      .then(data => setFragancias(data))
      .catch(err => console.error('Error cargando fragancias', err));
  }, []);

  const handleCheckboxChange = (tipo) => {
    if (tipo === 'masculino') {
      setMostrarMasculinos(prev => !prev);
    } else if (tipo === 'femenino') {
      setMostrarFemeninos(prev => !prev);
    }
  };

  const toggleDescripcion = (id) => {
    setDescripcionExpandida(prev => (prev === id ? null : id));
  };

  const fraganciasFiltradas = (() => {
    if (!mostrarMasculinos && !mostrarFemeninos) return fragancias;
    return fragancias.filter(frag =>
      (mostrarMasculinos && frag.tipo === 'masculino') ||
      (mostrarFemeninos && frag.tipo === 'femenino')
    );
  })();

  return (
    <Container className="my-4">
      <h2 className="mb-2 text-center">Catálogo de Fragancias</h2>

      <Form>
        <Row className="mb-4 justify-content-center">
          <Col xs="auto">
            <Form.Check
              type="checkbox"
              label="Marque para Fragancias Masculinas"
              checked={mostrarMasculinos}
              onChange={() => handleCheckboxChange('masculino')}
            />
          </Col>
          <Col xs="auto">
            <Form.Check
              type="checkbox"
              label="Marque para Fragancias Femeninas"
              checked={mostrarFemeninos}
              onChange={() => handleCheckboxChange('femenino')}
            />
          </Col>
        </Row>
      </Form>

      <Row>
        {fraganciasFiltradas.map((item) => {
          const descripcionCompleta = item.descripcion || 'Fragancia encantadora para uso diario.';
          const isExpanded = descripcionExpandida === item.id;
          const descripcionCorta = descripcionCompleta.length > 120 && !isExpanded
            ? descripcionCompleta.slice(0, 40) + '...'
            : descripcionCompleta;

          return (
            <Col key={item.id} md={3} className="mb-4 d-flex">
              <Card className="h-100 w-100 d-flex flex-column">
                {item.imagen && (
                  <div style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card.Img
                      variant="top"
                      src={item.imagen}
                      style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain'
                      }} />
                  </div>
                )}
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{item.nombre}</Card.Title>
                  <Card.Text>{item.type}</Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">
                    {item.tipo === 'masculino' ? 'Perfume Masculino' : 'Fragancia Femenina'}
                  </Card.Subtitle>

                  <Card.Text className="flex-grow-1">
                    {descripcionCorta}
                    {descripcionCompleta.length > 40 && (
                      <Button variant="link" size="sm" className="p-0 ps-1"
                        onClick={() => navigate(`/perfumeria/${item.Id}`)}>
                        Leer más
                      </Button>
                    )}
                  </Card.Text>

                  <Card.Text className="fw-bold mt-2">
                    Precio: ${item.precioregular || 'Consultar'}
                    <br></br>
                    Precio con Descuento: ${item.preciodescuento || 'Consultar'}
                  </Card.Text>
                  <div className="mt-auto">
                    <Button
                      className="mx-auto d-block"
                      onClick={() => agregarAlCarrito(item)}
                      style={{
                        backgroundColor: 'magenta',
                        borderColor: 'magenta',
                        padding: '6px 12px',
                        textAlign: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: '6px'
                      }}
                    >
                      Agregar al carrito
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Perfumeria;