import React, { useContext } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { CartContext } from './CartContext';
import { useAuth } from "../pages/AuthContext";
import { useNavigate } from "react-router-dom";

const Carrito = () => {
  const { carrito, setCarrito } = useContext(CartContext);
  const { token } = useAuth();     // null si no está logueado
  const navigate = useNavigate();

  const handleComprar = () => {
    if (!token) {
      navigate("/login");
    } else {
      // Continuar con el proceso de compra (confirmación, envío, etc.)
      console.log("Compra iniciada...");
      navigate("/formulariopago"); // o la ruta que uses
    }
  };

  const eliminarDelCarrito = (Id) => {
    setCarrito(prev => prev.filter(producto => producto.Id !== Id));
  };

  const total = carrito.reduce((acc, item) => acc + Number(item.precioregular) * item.cantidad, 0);

  if (carrito.length === 0) {
    return (
      <Container className="mt-4">
        <h3>Tu carrito está vacío</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h3>Carrito de compras</h3>
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio unitario</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((item) => (
            <tr key={item.id}>
              <td>{item.nombre}</td>
              <td>${Number(item.precioregular).toFixed(2)}</td>
              <td>{item.cantidad}</td>
              <td>${(Number(item.precioregular) * item.cantidad).toFixed(2)}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => eliminarDelCarrito(item.Id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h5 className="text-end">Total a pagar: ${total.toFixed(2)}</h5>
      <div className="d-flex justify-content-center mt-4">
        <Button className="btn btn-primary btn-lg" variant="success" onClick={handleComprar}>
          Pagar
        </Button>
      </div>
    </Container>
  );
};

export default Carrito;