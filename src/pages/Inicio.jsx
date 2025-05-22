import { Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';


export default function Inicio() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`https://6829df1bab2b5004cb350975.mockapi.io`)
      .then(res => res.json())
      .then(data => {
        setImages(data.results);
      })
      .catch(error => console.error('Error al obtener imágenes:', error));
  }, []);

  return (
    <Container className="mt-4">
      <section className="p-4 text-center">
        <h2 className="mb-4">Emprender con belleza</h2>
        <p className="mb-4">
          Emprender en el mundo de la cosmética y la perfumería es más que un negocio: es una forma de empoderar, de conectar con la belleza única de cada persona y ofrecer experiencias sensoriales que transforman el día a día. En Magenta creemos que cada aroma y cada textura cuentan una historia, y acompañamos a quienes sueñan con crear la suya propia.
        </p>
        <div style={{ flex: 1, maxWidth: '350px' }}>
          {images.map((img) => (
            <img
              src={img.imageUrl}
              alt={img.alt_description}
              className="img-fluid rounded"
              style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
            />
          ))}
        </div>
        <div className="d-flex flex-column flex-md-row align-items-center gap-4">
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.5' }}>
              Emprender en el mundo de la cosmética y la perfumería es más que un negocio: es una forma de empoderar, de conectar con la belleza única de cada persona y ofrecer experiencias sensoriales que transforman el día a día. En Magenta creemos que cada aroma y cada textura cuentan una historia, y acompañamos a quienes sueñan con crear la suya propia.
            </p>
          </div>
          
            <img
              src={producto.imagen} // Cambia 'imagen' por el campo correcto
              alt={producto.nombre || 'Producto'}
              
            />
          </div>
        </div>
      </section>
    </Container>
  );
}
