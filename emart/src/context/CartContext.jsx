import React, { createContext, useContext, useState } from 'react';
import { UserContext } from './UserContext';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const { loggedIn, userType, userEpoint, setUserEpoint, setCartItemCount } = useContext(UserContext);

  const originalEpoint = userEpoint;

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
    setCartItems((prevItems) => prevItems.filter((item) => item.key !== key));
  };

  const incrementItem = (key) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.key === key 
          ? { ...item, 
            quantity: (item.checked && userEpoint >= 100) ? 
              (setUserEpoint(userEpoint - 100), item.quantity + 1) : 
              (!item.checked) && item.quantity + 1 
            } 
            //(setCartItemCount(prevCount => prevCount + 1), item.quantity)
            //item.checked && userEpoint >= 100 ? (setUserEpoint(userEpoint - 100), item.quantity + 1 ) : item.quantity  } 
          : item
      )
    );
  };

  const decrementItem = (key) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.key === key 
          ? { ...item, 
            //originalEpoint is getting updated everytime with userEpoint
            quantity: (item.checked && userEpoint < originalEpoint) ? 
            (setUserEpoint(userEpoint + 100), Math.max(item.quantity - 1, 1)) : 
            (!item.checked) ? 
              Math.max(item.quantity - 1, 1) : 
              (setCartItemCount(prevCount => prevCount - 1), item.quantity)}
            //Math.max(item.quantity - 1, 1) } 
          : item
      )
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
