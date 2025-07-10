import { useEffect, useState } from 'react';
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
          <Col md={3} key={item.id} className="mb-4">
            <Card className="h-70 w-70 d-flex flex-column">
              <Card.Img
                variant="top"
                src={item.imagen}
                style={{
                  maxHeight: '50%',
                  maxWidth: '50%',
                  objectFit: 'contain'
                }} />
              <Card.Body>
                <Card.Title>{item.nombre}</Card.Title>
                <Card.Text>{item.descripcion.slice(0, 50)}...</Card.Text>
                <Button variant="primary" onClick={() => navigate(`/DetalleFragancia/${item.id}`)}>
                  Ver Detalles
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Fragancias;