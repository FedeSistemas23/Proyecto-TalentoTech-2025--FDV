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
            fontSize: '7.5rem',
          }}
        >
          Bienvenida a Eri.Bagues
        </h1>
        <p className="lead fs-2">"La belleza de ser libre."</p>
      </Container>
    </header>
  );
};

export default Header;