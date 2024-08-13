import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthCont } from './AuthCont';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthCont);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
