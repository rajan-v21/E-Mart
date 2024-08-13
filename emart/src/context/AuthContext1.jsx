// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import {jwtDecode} from 'jwt-decode'; // Ensure you have jwtDecode imported

// // Create the context
// const AuthContext = createContext();

// // Custom hook to use the AuthContext
// export const useAuth = () => useContext(AuthContext);

// function isTokenValid(token) {
//   if (!token) return false;
  
//   try {
//     const decodedToken = jwtDecode(token);
//     const currentTime = Date.now() / 1000;
//     return decodedToken.exp > currentTime;
//   } catch (error) {
//     console.error('Invalid token:', error);
//     return false;
//   }
// }

// function getToken() {
//   return localStorage.getItem('token');
// }

// async function makeAuthenticatedRequest(url, method = 'GET', data = null) {
//   const token = getToken();
//   if (!isTokenValid(token)) return;

//   try {
//     const response = await axios({
//       url,
//       method,
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//       data,
//     });

//     return response.data;
//   } catch (error) {
//     console.error('Error in request:', error);
//     if (error.response && error.response.status === 401) {
//       console.log('Unauthorized access. Redirecting to login.');
//     }
//   }
// }

// // AuthProvider component
// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = getToken();
//     if (token && isTokenValid(token)) {
//       try {
//         const decodedToken = jwtDecode(token);
//         console.log("Decoded Token:", decodedToken);
//         setIsLoggedIn(true);
//         setUser(decodedToken);
//       } catch (e) {
//         console.error('Invalid token:', e);
//       }
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, user, makeAuthenticatedRequest }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
