/*import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Perfumeria = () => {
  const navigate = useNavigate();
  const [fragancias, setFragancias] = useState([]);
  const [mostrarMasculinos, setMostrarMasculinos] = useState(false);
  const [mostrarFemeninos, setMostrarFemeninos] = useState(false);

 // Cargar fragancias una sola vez al montar el componente
useEffect(() => {
  fetch('https://6829df1bab2b5004cb350975.mockapi.io/imagenesBagues')
    .then(res => res.json())
    .then(data => setFragancias(data))
    .catch(err => console.error('Error cargando fragancias', err));
}, []);

// Manejo de los checkboxes
const handleCheckboxChange = (tipo) => {
  if (tipo === 'masculino') {
    setMostrarMasculinos(prev => !prev);
  } else if (tipo === 'femenino') {
    setMostrarFemeninos(prev => !prev);
  }
};

// Lógica de filtrado
const fraganciasFiltradas = (() => {
  // Si ambos están destildados, mostrar todo
  if (!mostrarMasculinos && !mostrarFemeninos) {
    return fragancias;
  }

  // Si alguno está tildado, filtrar por tipo
  return fragancias.filter(frag =>
    (mostrarMasculinos && frag.tipo === 'masculino') ||
    (mostrarFemeninos && frag.tipo === 'femenino')
  );
})();

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">Catálogo de Fragancias</h2>

      <Form>
        <Row className="mb-4 justify-content-center">
          <Col xs="auto">
            <Form.Check
              type="checkbox"
              label="Marque para Frangancias Masculinas"
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
        {fraganciasFiltradas.map((item) => (
          <Col key={item.id} md={4} className="mb-4">
            <Card>
              {item.imagen && <Card.Img variant="top" src={item.imagen} />}
              <Card.Body>
                <Card.Title>{item.nombre}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {item.tipo === 'masculino' ? 'Perfume Masculino' : 'Fragancia Femenina'}
                </Card.Subtitle>
                <Card.Text>
                  {item.descripcion || 'Fragancia encantadora para uso diario.'}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Perfumeria;*/
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Perfumeria = () => {
  const navigate = useNavigate();
  const [fragancias, setFragancias] = useState([]);
  const [mostrarMasculinos, setMostrarMasculinos] = useState(false);
  const [mostrarFemeninos, setMostrarFemeninos] = useState(false);
  const [descripcionExpandida, setDescripcionExpandida] = useState(null);

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
    <Container className="my-5">
      <h2 className="mb-4 text-center">Catálogo de Fragancias</h2>

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
            ? descripcionCompleta.slice(0, 120) + '...'
            : descripcionCompleta;

          return (
            <Col key={item.id} md={4} className="mb-4 d-flex">
              <Card className="h-100 w-100 d-flex flex-column">
                {item.imagen && (
                  <div style={{ height: '200px', overflow: 'hidden' }}>
                    <Card.Img
                      variant="top"
                      src={item.imagen}
                      style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                    />
                  </div>
                )}
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{item.nombre}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {item.tipo === 'masculino' ? 'Perfume Masculino' : 'Fragancia Femenina'}
                  </Card.Subtitle>

                  <Card.Text className="flex-grow-1">
                    {descripcionCorta}
                    {descripcionCompleta.length > 120 && (
                      <Button variant="link" size="sm" className="p-0 ps-1" 
                      onClick={() => navigate(`/perfumeria/${item.id}`)}>
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
                    <Button variant="primary" onClick={() => handleAgregarAlCarrito(item)}>
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