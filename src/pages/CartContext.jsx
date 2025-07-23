import React, { createContext, useState } from 'react';

export const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Agregar producto al carrito, con categoría identificada
  const agregarAlCarrito = (productoOriginal, categoria) => {
    // Normalizar el producto según la categoría
    let producto = {};

    if (categoria === 'perfumeria') {
      producto = {
        Id: productoOriginal.Id,
        nombre: productoOriginal.nombre,
        precio: productoOriginal.precioregular,
        imagen: productoOriginal.imagen,
      };
    } else if (categoria === 'fragancia') {
      producto = {
        Id: productoOriginal.Id, // fijate que en fragancias es `id` y no `Id`
        nombre: productoOriginal.nombre,
        precio: productoOriginal.precioenvase1, // podés hacerlo dinámico si querés
        imagen: productoOriginal.imagen,
      };
    }

    // Agregar o incrementar cantidad
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find(item => item.Id === producto.Id);
      if (existe) {
        return prevCarrito.map(item =>
          item.Id === producto.Id ? { ...item, cantidad: item.cantidad + 1 } : item
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