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
    /*<Container className="my-5">
      <Row className="justify-content-center">
        {fragancias.map((item) => (
          <Col md={3} key={item.id} className="mb-4">
            <Card className="h-100 d-flex flex-column">
              <Card.Img
                variant="top"
                src={item.imagen}
                style={{
                  Height: '200px',
                  Width: '100px',
                  objectFit: 'cover'
                }} />
              <div style={{ padding: 0, margin: 0 }}>
                <div className="text-center fw-bold py-2" style={{ backgroundColor: '#f8f9fa' }}>
                  {item.nombre}
                </div>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/DetalleFragancia/${item.id}`)}
                  className="w-100 m-0 rounded-0"
                  style={{ borderTop: '1px solid #ccc' }}
                >
                  Ver
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>*/
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

export default Fragancias;