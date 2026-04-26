import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { token, user } = useAuth(); 

    if (!token) {
        return <Navigate to="/login" replace />;
    }

   
    if (user && user.role !== 'admin') {
        alert("عذراً، هذه الصفحة مخصصة للمديرين فقط!");
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;