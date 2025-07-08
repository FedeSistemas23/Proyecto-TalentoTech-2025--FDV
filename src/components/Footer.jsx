import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer
      className="text-white text-center py-4 mt-5"
      style={{
        background: 'linear-gradient(180deg, #d63384, #e83e8c, #f06595)',
      }}
    >
      <div className="container">
        <h5 className="mb-3">¡Seguinos en redes!</h5>
        <div className="d-flex justify-content-center gap-4 fs-4 mb-3">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white">
            <FaLinkedinIn />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white">
            <FaGithub />
          </a>
        </div>
        <p className="mb-0">© {new Date().getFullYear()} Eri.Bagues. Todos los derechos reservados.2025</p>
      </div>
    </footer>
  );
};

export default Footer;