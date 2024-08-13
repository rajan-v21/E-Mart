import { useAuth } from './AuthCont';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const useLogin = () => {
    const { setUser } = useAuth();

    const login = async (email, password) => {
        try {
            const response = await axios.post('/public/token', { email, password });
            const token = response.data.token;

            localStorage.setItem('token', token);

            // Decode token and set user in context directly
            const decodedToken = jwtDecode(token);
            setUser({
                username: decodedToken.username,
                epoint: decodedToken.epoint,
                // Add other details as needed
            });
        } catch (error) {
            console.error("Login error", error);
            throw error;  // Optionally rethrow the error to handle it in the calling component
        }
    };

    return { login };
};
