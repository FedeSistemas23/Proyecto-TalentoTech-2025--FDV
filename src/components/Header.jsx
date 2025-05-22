/*import React from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';


function Header() {
    const headerStyle = {
      padding: '20px',
      textAlign: 'center',
      background: 'linear-gradient(180deg, #d500f9, #ff80ab)',
      color: 'white',
      fontSize: '2rem',
      fontWeight: 'bold',
      borderBottom: '4px solid #aa00ff'
    };
  
    return (
      <header style={headerStyle}>
        <h1>Bienvenidos a Eri.bagues</h1>
      </header>
    );
  }
  
  export default Header;*/
  import React from 'react';
import { Container } from 'react-bootstrap';
import { FaHeart, FaStar, FaLeaf } from 'react-icons/fa';

const Header = () => {
  return (
    <header
      className="py-5 text-center text-white"
      style={{
        background: 'linear-gradient(180deg, #d63384, #e83e8c, #f06595)',
      }}
    >
      <Container>
        <div className="d-flex justify-content-center mb-3 gap-3 fs-3">
          <FaHeart />
          <FaStar />
          <FaLeaf />
        </div>
        <h1
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: '3.5rem',
          }}
        >
          Bienvenida a Eri.Bagues
        </h1>
        <p className="lead">Tu espacio para brillar con estilo 💫</p>
      </Container>
    </header>
  );
};

export default Header;