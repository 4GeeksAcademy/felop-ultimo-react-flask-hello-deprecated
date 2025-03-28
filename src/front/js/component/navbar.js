import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    
    const handleLogout = () => {
        actions.logout();
        navigate("/login");
    };
    
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                
                <div className="ms-auto d-flex gap-2">
                    
                    
                    {store.token ? (
                        <button className="btn btn-danger" onClick={handleLogout}>
                            Cerrar sesión
                        </button>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="btn btn-success">Iniciar sesión</button>
                            </Link>
                            <Link to="/signup">
                                <button className="btn btn-outline-primary">Registrarse</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
