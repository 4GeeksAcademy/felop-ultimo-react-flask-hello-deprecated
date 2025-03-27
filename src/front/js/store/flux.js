const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token:sessionStorage.getItem("token") || null,
			user:null,
			authError:null
		},
		actions: {
			signup: async (email, password) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "api/signup", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email, password })
                    });

                    if (!response.ok) {
                        throw new Error("Error en el registro");
                    }

                    return true; // Registro exitoso
                } catch (error) {
                    console.error("Signup error:", error);
                    return false;
                }
            },

            login: async (email, password) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "api/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email, password })
                    });

                    if (!response.ok) {
                        throw new Error("Credenciales incorrectas");
                    }

                    const data = await response.json();
                    sessionStorage.setItem("token", data.token);
                    setStore({ token: data.token, authError: null });

                    return true;
                } catch (error) {
                    console.error("Login error:", error);
                    setStore({ authError: error.message });
                    return false;
                }
            },

            logout: () => {
                sessionStorage.removeItem("token");
                setStore({ token: null, user: null });
            },

            validateToken: async () => {
                const store = getStore();
                if (!store.token) return false;

                try {
                    const response = await fetch(process.env.BACKEND_URL + "api/validate-token", {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${store.token}`
                        }
                    });

                    if (!response.ok) {
                        throw new Error("Token inválido");
                    }

                    const data = await response.json();
                    setStore({ user: data.user_id });
                    return true;
                } catch (error) {
                    console.error("Token validation error:", error);
                    getActions().logout();
                    return false;
                }
            }
		}
	};
};

export default getState;
