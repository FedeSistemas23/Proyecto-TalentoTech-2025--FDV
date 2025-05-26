import { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Coraje() {
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://6829df1bab2b5004cb350975.mockapi.io/imagenesBagues')
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          const indiceAleatorio = Math.floor(Math.random() * data.length);
          setImagenSeleccionada(data[indiceAleatorio]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error cargando fragancias', err);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="mt-4">
      <h2
        className="mb-4"
        style={{
          fontSize: '2.5rem',
          fontWeight: '600',
          background: 'linear-gradient(to right, #d63384, #f06292)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontFamily: 'cursive',
          textAlign: 'center',
        }}
      >
        "Elegimos soñar, elegimos crecer, elegimos Emprender"
      </h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row className="align-items-center">
          <Col md={7}>
            <div
              className="p-4 rounded shadow text-white"
              style={{
                background: 'linear-gradient(135deg, #d63384, #f783ac)', // Magenta degradé
                textAlign: 'left',
                fontSize: '1.15rem',
                fontStyle: 'italic',
                fontWeight: '400',
                lineHeight: '1.8',
                letterSpacing: '0.3px'
              }}
            >
              <p>
                Emprender en el mundo de la cosmética y la perfumería es más que un negocio:
                es una forma de empoderar, de conectar con la belleza única de cada persona y
                ofrecer experiencias sensoriales que transforman el día a día. 
                <br></br>
                En el <strong> Equipo Coraje </strong>
                creemos que cada aroma y cada textura cuentan una historia, y acompañamos a
                quienes sueñan con crear la suya propia.
              </p>
              <p>
                Somos un equipo apasionado por la belleza y el bienestar.
                Está formado por mujeres emprendedoras que buscan empoderar a otras
                a través de productos de calidad.
              </p>
              <p>
                En nuestro <strong>Equipo Coraje</strong>,
                creemos en el cuidado personal como una forma de amor propio.
              </p>
            </div>
          </Col>
          <Col md={5}>
            {imagenSeleccionada && (
              <img
                src={imagenSeleccionada.imagen}
                alt={imagenSeleccionada.nombre}
                className="img-fluid rounded shadow"
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
}