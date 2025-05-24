export default function Coraje() {
  return <Container className="mt-4">
      <section className="p-4 text-center">
        <h2 className="mb-4">Emprender con belleza</h2>
        <div className="home-background d-flex align-items-center justify-content-center text-center text-white">
          <div className="bg-dark bg-opacity-75 p-4 rounded shadow w-75">
            <p className="fs-5">
              Emprender en el mundo de la cosmética y la perfumería es más que un negocio: 
              es una forma de empoderar, de conectar con la belleza única de ada persona y 
              ofrecer experiencias sensoriales que transforman el día a día. En Magenta 
              creemos que cada aroma y cada textura cuentan una historia, y acompañamos a 
              quienes sueñan con crear la suya propia.              
            </p>
          </div>
        </div>
        <div style={{ flex: 1, maxWidth: '350px' }}>
          {images.map((img) => (
            <img
              src={img.imageUrl}
              //alt={img.alt_description}
              className="img-fluid rounded"
              style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
            />
          ))}
        </div>
      </section>
    </Container >
}