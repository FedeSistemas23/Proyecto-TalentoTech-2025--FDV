import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { Container, Card, Row, Col, Button} from 'react-bootstrap';
import { CartContext } from './CartContext';
import { ToastContainer, toast } from 'react-toastify';


function DetalleFragancia() {
  const { id } = useParams();
  const [fragancia, setFragancia] = useState(null);
  const { agregarAlCarrito } = useContext(CartContext); // 👈 Accedemos al contexto

  useEffect(() => {
    fetch(`https://6829df1bab2b5004cb350975.mockapi.io/Unlock/${id}`)
      .then((res) => res.json())
      .then((data) => setFragancia(data))
      .catch((error) => console.error('Error al obtener detalle:', error));
  }, [id]);

  const handleAgregarAlCarrito = () => {
    agregarAlCarrito(fragancia);
    toast.success('Producto agregado al carrito 🎉');
  };

  if (!fragancia) return <p className="text-center mt-5">Cargando...</p>;

  return (
    <Container className="mt-5">
      <Card>
        <Row>
          <Col md={4}>
            <Card.Img src={fragancia.imagen} />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title>{fragancia.nombre}</Card.Title>
              <Card.Text><strong>Descripción:</strong> {fragancia.descripcion}</Card.Text>
              <Card.Text><strong>Envase 1:</strong> {fragancia.envase1} - {fragancia.precioenvase1}</Card.Text>
              <Card.Text><strong>Envase 2:</strong> {fragancia.envase2} - {fragancia.percioenvase2}</Card.Text>
              <Card.Text><strong>Familia olfativa:</strong> {fragancia.familiaolfativa}</Card.Text>
              <Card.Text><strong>Salida:</strong> {fragancia.salida}</Card.Text>
              <Card.Text><strong>Corazón:</strong> {fragancia.corazon}</Card.Text>
              <Card.Text><strong>Fondo:</strong> {fragancia.fondo}</Card.Text>
              <Card.Text><strong>Género:</strong> {fragancia.genero}</Card.Text>

              <Button variant="warning" onClick={handleAgregarAlCarrito}>
                Agregar al carrito
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      <ToastContainer />
    </Container>
  );
}

export default DetalleFragancia;