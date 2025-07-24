import { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../pages/CartContext';
import { toast, ToastContainer } from 'react-toastify';
import Buscador from '../components/Buscador';
import Paginador from '../components/Paginador';

function Fragancias() {
  const [fragancias, setFragancias] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [mostrarMasculinos, setMostrarMasculinos] = useState(false);
  const [mostrarFemeninos, setMostrarFemeninos] = useState(false);
  const { agregarAlCarrito } = useContext(CartContext);
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 6;
  const indiceInicial = (paginaActual - 1) * itemsPorPagina;
  const indiceFinal = indiceInicial + itemsPorPagina;


  useEffect(() => {
    const cargarFragancias = async () => {
      try {
        const res = await fetch('https://6829df1bab2b5004cb350975.mockapi.io/Unlock');
        const data = await res.json();
        setFragancias(data);
      } catch (error) {
        toast.error("Error al cargar productos");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    cargarFragancias();
  }, []);

  const handleCheckboxChange = (tipo) => {
    if (tipo === 'masculino') {
      setMostrarMasculinos(prev => !prev);
    } else if (tipo === 'femenino') {
      setMostrarFemeninos(prev => !prev);
    }
  };

  const fraganciasFiltradas = fragancias.filter(frag =>
    (!mostrarMasculinos && !mostrarFemeninos ||
      (mostrarMasculinos && frag.genero === 'masculino') ||
      (mostrarFemeninos && frag.genero === 'femenino')) &&
    frag.name.toLowerCase().includes(busqueda.toLowerCase())
  );
  const fraganciasPaginadas = fraganciasFiltradas.slice(indiceInicial, indiceFinal);
  return (
    <Container className="my-5">
      <h2 className="mb-2 text-center">Catálogo de Fragancias</h2>

      <Form>
        <Row className="mb-4 justify-content-center">
          <Col xs="auto">
            <Form.Check
              type="checkbox"
              label="Marque para Fragancias Masculinas"
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
        <Row className="mb-3">
          <Col>
            <Buscador valor={busqueda} onBuscar={setBusqueda} />
          </Col>
        </Row>
      </Form>

      <Row className="justify-content-center">
        {fraganciasPaginadas.map((item) => (
          <Col md={4} key={item.id} className="mb-4">
            <div className="position-relative overflow-hidden rounded shadow-sm group">
              <img src={item.imagen} alt={item.nombre} className="w-100"
                style={{ height: '250px', objectFit: 'cover', transition: 'all 0.3s ease' }} />
              <div
                className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-dark bg-opacity-50 opacity-0 group-hover-opacity transition"
                style={{ transition: 'opacity 0.3s ease' }} >
                <Button variant="light" size="sm" className="mb-2" onClick={() => navigate(`/DetalleFragancia/${item.id}`)}>
                  Ver más
                </Button>
                <Button variant="warning" size="sm" onClick={() => {
                  agregarAlCarrito(item, 'fragancia');
                  toast.success('Producto agregado al carrito 🎉');
                }} >
                  Agregar al carrito
                </Button>
              </div>
            </div>

            <div className="text-center mt-2 fw-bold">{item.nombre}</div>
          </Col>
        ))}
      </Row>

      <ToastContainer />

      <style jsx>{`
        .group:hover .group-hover-opacity {
          opacity: 1 !important;
        }
      `}</style>
      <Paginador
        totalItems={fraganciasFiltradas.length}
        itemsPorPagina={itemsPorPagina}
        paginaActual={paginaActual}
        onPaginaChange={setPaginaActual}
      />
    </Container>
  );
}

export default Fragancias;