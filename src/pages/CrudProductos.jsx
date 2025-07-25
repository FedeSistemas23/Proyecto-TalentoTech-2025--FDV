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

  useEffect(() => {
    if (!user || user.toLowerCase() !== 'admin') {
      navigate('/'); // redirige a la página principal si no es admin
    } else {
      getProductos();
    }
  }, [user, navigate]);


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
        pricewhitdiscount: Number(producto.preciodescuento),
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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-center w-100">Gestión de Stock</h2>
        <div className="ms-auto">
          <Button onClick={() => handleShow()}>Agregar Producto</Button>
        </div>
      </div>

      <div className="table-responsive">
        <Table striped bordered hover className="align-middle shadow-sm rounded">
          <thead className="table-dark">
            <tr>
              <th className="text-center align-middle">Título</th>
              <th className="text-center align-middle">Descripción</th>
              <th className="text-center align-middle"> Precio Regular</th>
              <th className="text-center align-middle">Precio con Descuento</th>
              <th className="text-center align-middle">Stock</th>
              <th className="text-center align-middle">Imagen</th>
              <th className="text-center align-middle">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(prod => (
              <tr key={prod.Id}>
                <td className="text-center align-middle">{prod.nombre}</td>
                <td className="text-center align-middle">{prod.descripcion}</td>
                <td className="text-center align-middle">${Number(prod.precioregular).toFixed(2)}</td>
                <td className="text-center align-middle">${Number(prod.preciodescuento).toFixed(2)}</td>
                <td className="text-center align-middle">{prod.stock}</td>
                <td className="text-center align-middle">
                  {prod.imagen?.startsWith('http') ? (
                    <img src={prod.imagen} alt={prod.nombre} width={50} className="img-thumbnail" />
                  ) : (
                    <span>{prod.imagen}</span>
                  )}
                </td>
                <td className="text-center align-middle">
                  <Button size="sm" className="me-2" onClick={() => handleShow(prod)}>Editar</Button>
                  <Button size="sm" variant="danger" onClick={() => eliminarProducto(prod.Id)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

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
              <Form.Label>Precio Regular</Form.Label>
              <Form.Control
                type="number"
                value={form.price}
                onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Precio con Descuento</Form.Label>
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
            <Button type="submit" className="mt-3 w-100">Guardar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CrudProductos;
