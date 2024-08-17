import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios'; // Import axios for making API calls

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState([]);

  const { userId, userEpoint, setUserEpoint, setCartItemCount } = useContext(UserContext);

  const [initialEpoint, setInitialEpoint] = useState(0);

  useEffect(() => {
    const fetchUserEpoint = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${userId}/epoint`);
        const fetchedEpoint = response.data.epoint;
        setInitialEpoint(fetchedEpoint); // Update state with fetched epoint      
      } catch (error) {
        console.error('Error fetching user epoint:', error);
      }
    };

    if (userId) {
      fetchUserEpoint(); // Fetch epoint only if userId exists
    }
  }, [userId]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find((item) => item.key === product.key);
      if (existingProduct) {
        return prevItems.map((item) =>  
          item.key === product.key
            ? { ...item, quantity: item.quantity + 1}
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (key) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((item) => item.key === key);
      if (item && item.checked) {
        // If the item was checked, reset the epoints
        setUserEpoint(initialEpoint);
      }
      return prevItems.filter((item) => item.key !== key);
    });
  };

  const incrementItem = (key) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.key === key
          ? {
              ...item,
              quantity:
                item.checked
                  ? userEpoint >= 100
                      ? (setUserEpoint(userEpoint - 100),
                        setCartItemCount((prevCount) => prevCount + 1),
                        Math.max((item.quantity || 0) + 1, 1)) // Ensure quantity is not undefined
                      : item.quantity
                  : (item.quantity || 0) + 1, // Ensure quantity is not undefined
            }
          : item
      )
    );
  };

  const decrementItem = (key) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.key === key) {
          if (item.checked) {
            console.log(initialEpoint, userEpoint);
            // const user = JSON.parse(sessionStorage.getItem('user')); 
            // const initialEpoint = loggedIn ? loggedIn.epoint : 0;
            // If item is checked, handle epoint adjustment
            if (userEpoint < initialEpoint) {
              console.log('Not enough epoints');
              // Adjust epoints and quantity if epoints are less than original
              setUserEpoint(Math.min(userEpoint + 100, initialEpoint-100));
              setCartItemCount((prevCount) => Math.max(prevCount - 1, 0));
              return {
                ...item,
                quantity: Math.max((item.quantity || 0) - 1, 1), // Ensure quantity does not fall below 1
              };
            }
          } else {
            // If item is not checked, just decrement the quantity
            return {
              ...item,
              quantity: Math.max((item.quantity || 0) - 1, 1), // Ensure quantity does not fall below 1
            };
          }
        }
        return item;
      })
    );
  };
  

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    incrementItem,
    decrementItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
