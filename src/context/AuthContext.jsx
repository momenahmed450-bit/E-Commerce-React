import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('userToken') || null);
    const [loading, setLoading] = useState(true);

useEffect(() => {
    const checkAuth = async () => {
        if (token) {
            
            if (token.startsWith('fake-')) {
                setLoading(false);
                return;
            }

            try {
                const res = await fetch('https://dummyjson.com/auth/me', {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                } else {
                    logout();
                }
            } catch (error) {
                logout();
            }
        }
        setLoading(false);
    };
    checkAuth();
}, [token]);

    const login = (userData) => {
        setUser(userData);
        setToken(userData.token);
        localStorage.setItem('userToken', userData.token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('userToken');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);