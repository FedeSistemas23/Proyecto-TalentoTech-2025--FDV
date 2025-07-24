import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  gap: 0.5rem;
`;

const Button = styled.button`
  background-color: ${({ active }) => (active ? 'magenta' : 'white')};
  color: ${({ active }) => (active ? 'white' : 'magenta')};
  border: 2px solid magenta;
  border-radius: 6px;
  padding: 6px 12px;
  font-weight: bold;
  cursor: pointer;
  min-width: 40px;

  &:disabled {
    background-color: #ddd;
    color: #999;
    border-color: #ddd;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${({ active }) => (active ? 'magenta' : '#f0e0f5')};
  }
`;

const Paginador = ({ totalItems, itemsPorPagina, paginaActual, onPaginaChange }) => {
    const totalPaginas = Math.ceil(totalItems / itemsPorPagina);
    if (totalPaginas <= 1) return null;

    // Defino cuántos botones mostrar (paginación acotada)
    const maxButtons = 5;
    let startPage = Math.max(paginaActual - Math.floor(maxButtons / 2), 1);
    let endPage = startPage + maxButtons - 1;

    if (endPage > totalPaginas) {
        endPage = totalPaginas;
        startPage = Math.max(endPage - maxButtons + 1, 1);
    }

    const paginas = [];
    for (let i = startPage; i <= endPage; i++) {
        paginas.push(
            <Button
                key={i}
                active={i === paginaActual}
                onClick={() => onPaginaChange(i)}
            >
                {i}
            </Button>
        );
    }

    return (
        <PaginationContainer>
            <Button
                disabled={paginaActual === 1}
                onClick={() => onPaginaChange(paginaActual - 1)}
            >
                Anterior
            </Button>

            {startPage > 1 && (
                <>
                    <Button onClick={() => onPaginaChange(1)}>1</Button>
                    {startPage > 2 && <span>...</span>}
                </>
            )}

            {paginas}

            {endPage < totalPaginas && (
                <>
                    {endPage < totalPaginas - 1 && <span>...</span>}
                    <Button onClick={() => onPaginaChange(totalPaginas)}>{totalPaginas}</Button>
                </>
            )}

            <Button
                disabled={paginaActual === totalPaginas}
                onClick={() => onPaginaChange(paginaActual + 1)}
            >
                Siguiente
            </Button>
        </PaginationContainer>
    );
};

export default Paginador;
