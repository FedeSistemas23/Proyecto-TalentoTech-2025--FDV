import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const saved = sessionStorage.getItem("carrito");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Agregar producto al carrito, con categoría identificada
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find(item => item.Id === producto.Id);
      if (existe) {
        return prevCarrito.map(item =>
          item.Id === producto.Id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (Id) => {
    setCarrito((prevCarrito) => prevCarrito.filter(item => item.Id !== Id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    sessionStorage.removeItem("carrito");
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        setCarrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito
      }}
    >
      {children}
    </CartContext.Provider>
  );
};