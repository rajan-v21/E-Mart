import React, { createContext, useState, useEffect, useContext } from 'react';
import {jwtDecode} from 'jwt-decode';

// Create the Auth context
export const AuthContext = createContext();

// AuthProvider component to provide user info to the rest of the app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUser({
                username: decodedToken.username,
                epoint: decodedToken.epoint,
                userid: decodedToken.userid,
                useremail: decodedToken.useremail,
                usertype: decodedToken.usertype,
            });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the Auth context
export const useAuth = () => {
    return useContext(AuthContext);
};
