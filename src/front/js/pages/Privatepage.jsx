import React, { useContext } from "react";
import { Context } from "../store/appContext";

const PrivatePage = () => {
    const { actions } = useContext(Context);

    return (
        <div className="container mt-5">
            <h2>Bienvenido a la página protegida</h2>
            <button className="btn btn-danger" onClick={actions.logout}>
                Cerrar sesión
            </button>
        </div>
    );
};

export default PrivatePage;
