import { FaSearch } from 'react-icons/fa';

export default function Buscador({ valor, onBuscar }) {
    return (
        <div className="input-group mb-3">
            <span className="input-group-text"><FaSearch /></span>
            <input
                type="text"
                className="form-control"
                placeholder="Buscar producto..."
                value={valor}
                onChange={e => onBuscar(e.target.value)}
            />
        </div>
    );
}
