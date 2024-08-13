import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const loggedIn = JSON.parse(sessionStorage.getItem('user'));  
  const userId = loggedIn ? loggedIn.userid : 0;
  const userEmail = loggedIn ? loggedIn.useremail : '';
  const userName = loggedIn ? loggedIn.username : 'Guest';
  const userType = loggedIn ? loggedIn.usertype : 0;
  const [userEpoint, setUserEpoint] = useState(loggedIn ? loggedIn.epoint : 0);

  return (
    <UserContext.Provider value={{loggedIn, userId, userEmail, userName, userType, userEpoint, setUserEpoint }}>
      {children}
    </UserContext.Provider>
  );
};
