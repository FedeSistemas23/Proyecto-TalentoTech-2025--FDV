import React, { createContext, useState } from 'react';

// Crear el contexto
export const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find(item => item.Id === producto.Id);
      if (existe) {
        // Si ya existe, aumentar la cantidad
        return prevCarrito.map(item =>
          item.Id === producto.Id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
        
      }
      // Si no existe, agregarlo con cantidad 1
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  // Eliminar producto por ID
  const eliminarDelCarrito = (Id) => {
    setCarrito((prevCarrito) => prevCarrito.filter(item => item.Id !== Id));
  };

  // Vaciar el carrito (opcional)
  const vaciarCarrito = () => {
    setCarrito([]);
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
