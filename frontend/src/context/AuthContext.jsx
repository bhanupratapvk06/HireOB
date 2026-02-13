import { createContext, useContext, useMemo, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const register = async (formData) => {
        try {
            setLoading(true);

            const res = await axios.post(
                "http://localhost:5000/api/user/register",
                formData
            );

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                setToken(res.data.token);
            }

            return res.data;

        } catch (error) {
            throw error.response?.data?.message || "Registration failed";
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setLoading(true);

            const res = await axios.post(
                "http://localhost:5000/api/user/login",
                { email, password }
            );

            const receivedToken = res.data.token;

            localStorage.setItem("token", receivedToken);
            setToken(receivedToken);

        } catch (error) {
            console.error("Login failed:", error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };


    const authValue = useMemo(() => ({
        token,
        user,
        login,
        logout,
        loading,
        register,
        isAuthenticated: !!token
    }), [token, user, loading]);

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}