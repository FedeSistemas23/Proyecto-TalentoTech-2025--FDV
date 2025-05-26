import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Perfumeria = () => {
  const [fragancias, setFragancias] = useState([]);
  const [mostrarMasculinos, setMostrarMasculinos] = useState(true);
  const [mostrarFemeninos, setMostrarFemeninos] = useState(true);

  useEffect(() => {
    // Fetch único de todas las fragancias
    fetch('https://6829df1bab2b5004cb350975.mockapi.io/imagenesBagues')
      .then(res => res.json())
      .then(data => setFragancias(data))
      .catch(err => console.error('Error cargando fragancias', err));
  }, []);

  const handleCheckboxChange = (tipo) => {
    if (tipo === 'masculino') {
      setMostrarMasculinos(!mostrarMasculinos);
    } else if (tipo === 'femenino') {
      setMostrarFemeninos(!mostrarFemeninos);
    }
  };

  // Filtrado según los checkboxes
  const fraganciasFiltradas = fragancias.filter(frag =>
    (mostrarMasculinos && frag.tipo === 'masculino') ||
    (mostrarFemeninos && frag.tipo === 'femenino')
  );

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

export default Perfumeria;