import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaAsterisk } from "react-icons/fa";

const UnlockPromo = () => {
  const [imagen, setImagenUrl] = useState(null);

  useEffect(() => {
    fetch("https://6829df1bab2b5004cb350975.mockapi.io/iunlock")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setImagenUrl(data[0].imagen);
        }
      })
      .catch((error) => console.error("Error cargando la imagen:", error));
  }, []);

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
