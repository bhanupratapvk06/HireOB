import { createContext, useContext, useEffect, useMemo, useState } from "react";

import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const authHeader = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const register = async (formData) => {
        try {
            setLoading(true);

            const res = await axios.post(
                "http://localhost:5000/api/users/register",
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
                "http://localhost:5000/api/users/login",
                { email, password }
            );

            const receivedToken = res.data.token;

            localStorage.setItem("token", receivedToken);
            setToken(receivedToken);

        } catch (error) {
            throw error.response?.data?.message || "Login failed";
        } finally {
            setLoading(false);
        }
    };

    const fetchUser = async () => {
        if (!token) return;

        try {
            const res = await axios.get(
                "http://localhost:5000/api/users/me",
                authHeader
            );
            setUser(res.data.user);
        } catch {
            logout();
        }
    };


    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    useEffect(() => {
        fetchUser();
    }, [token])


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