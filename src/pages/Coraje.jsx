import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
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
          fontSize: '1.5rem',
          fontWeight: '600',
          background: 'linear-gradient(to right, #d63384, #f06292)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontFamily: 'cursive',
          textAlign: 'center',
          paddingBottom: '20px',
        }}>
        "Elegimos soñar, elegimos crecer, elegimos Emprender"
      </h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row className="align-items-center" style={{ paddingTop: '0 px', marginTop:'0px' }}>
          <Col md={7} className="d-flex" >
            <div
              className="p-4 rounded shadow text-white"
              style={{
                background: 'linear-gradient(135deg, #d63384, #f783ac)', // Magenta degradé
                textAlign: 'left',
                fontSize: '1.15rem',
                fontStyle: 'italic',
                fontWeight: '400',
                lineHeight: '1.8',
                letterSpacing: '0.3px',
                paddingTop: '-30px',
              }}
            >
              <p>
                Emprender en el mundo de la cosmética y la perfumería es más que un negocio:
                es una forma de empoderar, de conectar con la belleza única de cada persona y
                ofrecer experiencias sensoriales que transforman el día a día.
                <br></br>
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
          <Col md={5} className="d-flex">
            {imagenSeleccionada && (
              <img
                src={imagenSeleccionada.imagen}
                alt={imagenSeleccionada.nombre}
                //className="img-fluid rounded shadow"
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            )}
          </Col>
        </Row>
      )}
      <div className="text-center mb-4">
        <Link to="/contacto">
          <Button size="lg"
            style={{
              background: 'linear-gradient(to bottom, #d63384, #f783ac)',
              border: 'none',
              color: 'white',
              padding: '10px 25px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              borderRadius: '30px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}>
            Sumate al Equipo Coraje
          </Button>
        </Link>
      </div>
    </Container>
  );
}