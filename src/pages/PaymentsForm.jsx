import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FormularioPago = () => {
    const { token, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Formulario de Pago</h2>

            <div className="alert alert-info text-center" role="alert">
                🛠️ Esta sección está en construcción. Pronto podrás realizar tus pagos desde aquí.
            </div>

            <form>
                <div className="mb-3">
                    <label className="form-label">Nombre completo</label>
                    <input type="text" className="form-control" placeholder="Juan Pérez" disabled />
                </div>

                <div className="mb-3">
                    <label className="form-label">Número de tarjeta</label>
                    <input type="text" className="form-control" placeholder="**** **** **** ****" disabled />
                </div>

                <div className="mb-3">
                    <label className="form-label">Fecha de vencimiento</label>
                    <input type="text" className="form-control" placeholder="MM/AA" disabled />
                </div>

                <div className="mb-3">
                    <label className="form-label">Código de seguridad (CVV)</label>
                    <input type="text" className="form-control" placeholder="123" disabled />
                </div>

                <button className="btn btn-primary w-100" disabled>
                    Pagar ahora
                </button>
            </form>
        </div>
    );
};

export default FormularioPago;
