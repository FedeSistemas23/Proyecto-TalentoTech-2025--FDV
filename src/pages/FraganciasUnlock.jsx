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
    <Container className="mt-4">
      <Row>
        {fragancias.map((item) => (
          <Col md={4} key={item.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={item.imagen} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.descripcion.slice(0, 100)}...</Card.Text>
                <Button variant="primary" onClick={() => navigate(`/fragancia/${item.id}`)}>
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