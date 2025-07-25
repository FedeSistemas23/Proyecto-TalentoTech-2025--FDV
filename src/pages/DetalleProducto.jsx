import React, { useEffect, useState, useContext} from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { CartContext } from './CartContext';
import { ToastContainer, toast } from 'react-toastify';

const Producto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const { agregarAlCarrito } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://6829df1bab2b5004cb350975.mockapi.io/imagenesBagues/${id}`)
      .then(res => res.json())
      .then(data => setProducto(data))
      .catch(err => console.error('Error cargando producto', err));
  }, [id]);

  const handleAgregar = () => {
    console.log(`Agregado ${cantidad}x ${producto.nombre} al carrito`);
    // Aquí iría tu lógica de carrito
  };

  if (!producto) return <p>Cargando...</p>;

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="h-70 w-70 d-flex flex-column">
            <Card.Img
              variant="top"
              src={producto.imagen}
              style={{
                maxHeight: '50%',
                maxWidth: '50%',
                objectFit: 'contain'
              }}
            />
            <Card.Body>
              <Card.Title>{producto.nombre}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {producto.tipo === 'masculino' ? 'Perfume Masculino' : 'Fragancia Femenina'}
              </Card.Subtitle>
              <Card.Text>{producto.descripcion}</Card.Text>
              <Card.Text className="fw-bold">Precio: ${producto.precioregular || 'Consultar'}</Card.Text>

              <Form.Group controlId="cantidad">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type="number"
                  value={cantidad}
                  min={1}
                  onChange={(e) => setCantidad(Number(e.target.value))}
                />
              </Form.Group>

              <div className="mt-auto">
                <Button
                  className="mx-auto d-block"
                  onClick={() => {
                    agregarAlCarrito({
                      Id: producto.id,
                      nombre: producto.nombre,
                      precioregular: producto.precioregular || null,
                      preciodescuento: producto.preciodescuento || null,
                    }); toast.success("Producto agregado al carrito 🎉");
                  }}

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
      </Row>.
      <ToastContainer />
    </Container >
  );
};

export default Producto;