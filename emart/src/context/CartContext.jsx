import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';

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
        setInitialEpoint(fetchedEpoint);
      } catch (error) {
        console.error('Error fetching user epoint:', error);
      }
    };

    if (userId) {
      fetchUserEpoint();
    }
  }, [userId]);

  useEffect(() => {
    const storedCartItems = sessionStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const updateCartItems = (newCartItems) => {
    setCartItems(newCartItems);
    sessionStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find((item) => item.key === product.key);
      let updatedCart;
      if (existingProduct) {
        updatedCart = prevItems.map((item) =>
          item.key === product.key
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prevItems, { ...product, quantity: 1 }];
      }
      updateCartItems(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (key) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((item) => item.key === key);
      if (item && item.checked) {
        setUserEpoint(initialEpoint);
      }
      const updatedCart = prevItems.filter((item) => item.key !== key);
      updateCartItems(updatedCart);
      return updatedCart;
    });
  };

  const incrementItem = (key) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.map((item) => {
        if (item.key === key) {
          const newQuantity = item.checked && userEpoint >= 100
            ? (setUserEpoint(userEpoint - 100), Math.max((item.quantity || 0) + 1, 1))
            : Math.max((item.quantity || 0) + 1, 1);
          setCartItemCount((prevCount) => prevCount + 1);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      updateCartItems(updatedCart);
      return updatedCart;
    });
  };

  const decrementItem = (key) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.map((item) => {
        if (item.key === key) {
          let newQuantity = Math.max((item.quantity || 0) - 1, 1);
          if (item.checked) {
            if (userEpoint < initialEpoint) {
              setUserEpoint(Math.min(userEpoint + 100, initialEpoint - 100));
            }
            newQuantity = Math.max(newQuantity, 1);
          }
          setCartItemCount((prevCount) => Math.max(prevCount - 1, 0));
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      updateCartItems(updatedCart);
      return updatedCart;
    });
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
