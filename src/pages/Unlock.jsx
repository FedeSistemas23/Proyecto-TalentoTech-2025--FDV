import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { FaAsterisk } from "react-icons/fa";

const UnlockPromo = () => {
  const navigate = useNavigate();
  const [imagen, setImagenUrl] = useState(null);
  const [fragancias, setFragancias] = useState([]);
  const [mostrarFragancias, setMostrarFragancias] = useState(false);

  useEffect(() => {
    fetch("https://6829df1bab2b5004cb350975.mockapi.io/Unlock")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setImagenUrl(data[0].imagen);
        }
      })
      .catch((error) => console.error("Error cargando la imagen:", error));
  }, []);
  const manejarClickFragancias = () => {
    if (!mostrarFragancias) {
      fetch("https://6829df1bab2b5004cb350975.mockapi.io/Unlock")
        .then((res) => res.json())
        .then((data) => {
          setFragancias(data);
          setMostrarFragancias(true);
        })
        .catch((error) => console.error("Error cargando fragancias:", error));
    } else {
      setMostrarFragancias(false); // Ocultar si ya está mostrando
    }
  };

  // 🎨 Estilos incrustados
  const styles = {
    unlockSection: {
      position: "relative",
      minHeight: "100vh",
      background: "#000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: "white",
      overflow: "hidden",
    },
    overlay: {
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      background: "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9))",
      zIndex: 1,
    },
    content: {
      position: "relative",
      zIndex: 2,
    },
    unlockIcon: {
      color: "#fff",
      margin: "0 8px",
    },
    perfumeImage: {
      maxWidth: "400px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(255,255,255,0.3)",
    },
  };

  return (
    <div style={styles.unlockSection}>
      <div style={styles.overlay} />
      <Container style={styles.content}>
        <Row>
          <Col>
            <h1 className="display-4 fw-bold">
              UNL
              <span style={styles.unlockIcon}>
                <FaAsterisk />
              </span>
              CK
            </h1>
            <p className="lead">
              En un universo donde el lujo se reserva para unos pocos privilegiados,{" "}
              <strong>UNLOCK</strong> desafía ese status quo. En nuestra búsqueda constante por
              la excelencia y la innovación, nos comprometemos a democratizar el acceso a las
              fragancias de lujo.
            </p>

            <p>
              Únete a nosotros en este viaje hacia un nuevo mundo donde la sofisticación y el
              refinamiento estén al alcance de todos. Juntos, estamos desbloqueando el potencial
              de la perfumería y llevándola a nuevas alturas.
            </p>
            <Button variant="link" className="text-white fw-bold p-0" onClick={manejarClickFragancias}>
              Ver Fragancias
            </Button>
          </Col>
        </Row>

        {imagen && (
          <Row className="justify-content-center mt-5">
            <Col xs="auto">
              <img
                src={imagen}
                alt="Frascos de perfume"
                style={styles.perfumeImage}
                className="img-fluid"
              />
            </Col>
          </Row>
        )}
        {mostrarFragancias && (
          <Row className="mt-4">
            {fragancias.map((item) => {
              const descripcionCompleta = item.descripcion || '';
              const descripcionCorta =
                descripcionCompleta.length > 120
                  ? descripcionCompleta.substring(0, 120) + '...'
                  : descripcionCompleta;

              return (
                <Col key={item.id} md={4} className="mb-4 d-flex">
                  <Card className="h-100 w-100 d-flex flex-column">
                    {item.imagen && (
                      <div style={{ height: '200px', overflow: 'hidden' }}>
                        <Card.Img
                          variant="top"
                          src={item.imagen}
                          style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                        />
                      </div>
                    )}
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>{item.descripcion}</Card.Text>
                      <Card.Subtitle className="mb-2 text-muted">
                        {item.genero === 'masculino'
                          ? 'Perfume Masculino'
                          : item.genero === 'femenino'
                            ? 'Fragancia Femenina'
                            : ''}
                      </Card.Subtitle>

                      <Card.Text className="flex-grow-1">
                        {descripcionCorta}
                        {descripcionCompleta.length > 120 && (
                          <Button variant="link" size="sm" className="p-0 ps-1"
                            onClick={() => navigate(`/detallefragancia/${item.Id}`)}>
                            Leer más
                          </Button>
                        )}
                      </Card.Text>

                      <Card.Text className="fw-bold mt-2">
                        Precio 100 ML: {item.precioenvase1 || 'Consultar'}
                        <br />
                        Precio 25 ML: ${item.percioenvase2 || 'Consultar'}
                      </Card.Text>

                      <div className="mt-auto">
                        <Button
                          variant="primary"
                          onClick={() => console.log('Agregar al carrito:', item)}
                        >
                          Agregar al carrito
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}

        <Row className="mt-4">
          <Col>
            <p className="text-white-50 small">
              CICLO 06/25 <br /> 02 JUN - 27 JUN
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UnlockPromo;
