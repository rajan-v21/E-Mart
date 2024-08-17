import React, { createContext, useState, useEffect } from 'react';


// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {

  // Fetch user epoint from API when component mounts
  


  const loggedIn = JSON.parse(sessionStorage.getItem('user'));  
  const userId = loggedIn ? loggedIn.userId : 0;
  const userEmail = loggedIn ? loggedIn.useremail : '';
  const userName = loggedIn ? loggedIn.username : 'Guest';
  const userType = loggedIn ? loggedIn.usertype : 0;
  const [userEpoint, setUserEpointState] = useState(loggedIn ? loggedIn.epoint : 0);
  const [cartItemCount, setCartItemCount] = useState(() => {
    const savedCartItemCount = sessionStorage.getItem('cartItemCount');
    return savedCartItemCount ? parseInt(savedCartItemCount, 10) : 0;
  });

  // Update cartItemCount in sessionStorage when it changes
  useEffect(() => {
    sessionStorage.setItem('cartItemCount', cartItemCount);
  }, [cartItemCount]);


  // const setCartItemCount = (newCount) => {
  //   if (newCount >= 0) {
  //     setCartItemCountState(newCount);
  //   }
  // };


   // Update cartItemCount in localStorage when it changes
   useEffect(() => {
    sessionStorage.setItem('cartItemCount', cartItemCount);
  }, [cartItemCount]);
  


  const setUserEpoint = (newEpoint) => {
    // Ensure that userEpoint does not go below 0
    if (newEpoint >= 0) {
      setUserEpointState(newEpoint);
      // Update the sessionStorage to keep it in sync so on refresh points don't reset to 100
      const updatedUser = { ...loggedIn, epoint: newEpoint };
      sessionStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <UserContext.Provider value={{
      loggedIn, userId, userEmail, userName, userType,
      cartItemCount, setCartItemCount, 
      userEpoint, setUserEpoint }}>
      {children}
    </UserContext.Provider>
  );
};
