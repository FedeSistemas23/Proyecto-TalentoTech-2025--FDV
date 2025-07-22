import React, { useEffect, useState } from 'react';
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { Table, Button, Form, Modal } from 'react-bootstrap';

const API_URL = 'https://6829df1bab2b5004cb350975.mockapi.io/imagenesBagues';

const CrudProductos = () => {
  const [productos, setProductos] = useState([]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', price: '', pricewhitdiscount: '', stock: '', image: '' });
  const [editId, setEditId] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getProductos = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setProductos(data);
  };

  const handleClose = () => {
    setShow(false);
    setForm({ title: '', description: '', price: '', stock: '', image: '' });
    setEditId(null);
  };

  const handleShow = (producto) => {
    setShow(true);
    if (producto) {
      setForm({
        ...producto,
        title: (producto.nombre),
        description: (producto.descripcion),
        price: Number(producto.precioregular),
        pricewhitdiscount:Number(producto.preciodescuento),
        stock: Number(producto.stock),
        imange: (producto.imagen),
      });
      setEditId(producto.Id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      nombre: form.title,
      descripcion: form.description,
      precioregular: Number(form.price),
      preciodescuento: Number(form.pricewhitdiscount),
      stock: Number(form.stock),
      imagen: form.image,
      // si querés que el precio con descuento sea igual al regular:
      
    };

    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `${API_URL}/${editId}` : API_URL;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });

    handleClose();
    getProductos();
  };

  const eliminarProducto = async (Id) => {
    if (window.confirm('¿Seguro que quieres eliminar este producto?')) {
      await fetch(`${API_URL}/${Id}`, { method: 'DELETE' });
      getProductos();
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (

    <div className="container mt-4">
      <h2>Gestion de Stock</h2>
      <Button variant="outline-light" onClick={handleLogout}>
        Cerrar sesión
      </Button>
      <Button className="mb-3" onClick={() => handleShow()}>Agregar Producto</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Precio Regular</th>
            <th>Precio con descuento</th>
            <th>Stock</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(prod => (
            <tr key={prod.Id}>
              <td>{prod.nombre}</td>
              <td>{prod.descripcion}</td>
              <td>${Number(prod.precioregular).toFixed(2)}</td>
              <td>${Number(prod.preciodescuento).toFixed(2)}</td>
              <td>{prod.stock}</td>
              <td>
                {prod.imagen?.startsWith('http') ? (
                  <img src={prod.imagen} alt={prod.nombre} width={50} />
                ) : (
                  <span>{prod.imagen}</span>
                )}
              </td>
              <td>
                <Button size="sm" onClick={() => handleShow(prod)}>Editar</Button>{' '}
                <Button size="sm" variant="danger" onClick={() => eliminarProducto(prod.Id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? 'Editar' : 'Agregar'} Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Título</Form.Label>
              <Form.Control
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                value={form.price}
                onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                value={form.pricewhitdiscount}
                onChange={e => setForm({ ...form, pricewhitdiscount: Number(e.target.value) })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={form.stock}
                onChange={e => setForm({ ...form, stock: Number(e.target.value) })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Imagen (URL)</Form.Label>
              <Form.Control
                value={form.image}
                onChange={e => setForm({ ...form, image: e.target.value })}
                required
              />
            </Form.Group>
            <Button type="submit" className="mt-2">Guardar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>

  );
};

export default CrudProductos;
