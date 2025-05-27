import { Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';


export default function Inicio() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`https://6829df1bab2b5004cb350975.mockapi.io`)
      .then(res => res.json())
      .then(data => {
        setImages(data);
      })
      .catch(error => console.error('Error al obtener imágenes:', error));
  }, []);

  return (
    <Container className="mt-4">
      <section className="p-4 text-center">
        <h2 className="mb-4">Creer, Crear, Crecer</h2>
              <div
        className="d-flex align-items-center justify-content-center text-white"
        style={{
          background: 'linear-gradient(to right, #d63384, #f06292)',
          padding: '2rem',
          borderRadius: '1rem',
        }}
      >
        <div
          className="p-4 shadow w-100"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '1rem',
            fontFamily: 'cursive',
            textAlign: 'left',
          }}
        >
          <p className="fs-5">
            El emprendedurismo es un motor clave para el desarrollo económico y social.
            Las personas emprendedoras identifican oportunidades donde otros ven problemas,
            y están dispuestas a asumir riesgos para transformar sus ideas en negocios viables.
            Esta actitud proactiva no solo genera beneficios individuales, sino que también
            contribuye al crecimiento de las comunidades y al dinamismo de las economías.
            <br /><br />
            Iniciar un emprendimiento requiere una combinación de habilidades, conocimientos y resiliencia.
            Los emprendedores deben tener capacidad para planificar, adaptarse al cambio, gestionar recursos
            y tomar decisiones bajo incertidumbre. Además, es fundamental que tengan una visión clara y
            una fuerte motivación, ya que los desafíos son constantes y los fracasos pueden formar parte del proceso.
            En este sentido, el apoyo de redes, mentores y programas de incubación puede ser decisivo para alcanzar el éxito.
            <br /><br />
            Hoy en día, el ecosistema emprendedor se ha fortalecido gracias a la tecnología, el acceso a la información y una
            mayor conciencia social sobre la importancia del emprendimiento. Desde startups tecnológicas hasta proyectos con impacto
            social o ambiental, las formas de emprender son tan diversas como las personas que las lideran.
            Fomentar el emprendedurismo es, por lo tanto, una estrategia esencial para construir un futuro más innovador, inclusivo y sostenible.
          </p>
        </div>
      </div>
        <div style={{ flex: 1, maxWidth: '350px' }}>
          {images.map((img) => (
            <img
              src={img.imagen}
              //alt={img.alt_description}
              className="img-fluid rounded"
              style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
            />
          ))}
        </div>
      </section>
    </Container >
  );
}
