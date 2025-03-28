import React, { useContext } from "react";
import { Context } from "../store/appContext";

const PrivatePage = () => {
    const { actions } = useContext(Context);

    return (
        <div style={{
            backgroundImage: `url('https://us.123rf.com/450wm/larysaray/larysaray2005/larysaray200500001/147953929-doodle-concepto-de-personaje-de-guardaespaldas-de-gato-ilustraci%C3%B3n-de-super-esp%C3%ADa-dise%C3%B1o-simple-en.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            width: '100%'
        }}  className="container mt-5">
            <h2 className="text-center">Bienvenido a la página protegida</h2>
            
        </div>
    );
};

export default PrivatePage;
