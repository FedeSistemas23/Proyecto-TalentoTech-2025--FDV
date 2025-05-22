import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Conocenos() {
  return (
    <Container className="py-5">
      <Row className="align-items-center">
        <Col md={6}>
          <Image
            src="https://images.unsplash.com/photo-1611262588024-cd3c4326b3c6"
            alt="Equipo"
            fluid
            rounded
          />
        </Col>
        <Col md={6}>
          <Card bg="light" text="dark" className="p-4 shadow-sm border-0">
            <Card.Body>
              <Card.Title className="fs-3 fw-bold mb-3">¡Conocenos!</Card.Title>
              <Card.Text style={{ fontSize: '1.1rem' }}>
                Somos una empresa apasionada por la belleza y el bienestar. Nuestro equipo está formado por mujeres emprendedoras que buscan empoderar a otras a través de productos de calidad.
                <br /><br />
                En <strong>Eri.bagues</strong>, creemos en el cuidado personal como una forma de amor propio.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}