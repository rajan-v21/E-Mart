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
          let newQuantity = item.quantity || 0;
          if (item.checked && userEpoint >= 100) {
            newQuantity += 1;
            setUserEpoint(userEpoint - 100); // Deduct epoint
          } else if (!item.checked) {
            newQuantity += 1; // No epoint required for unchecked items
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      updateCartItems(updatedCart);
      // Update the cart item count here if necessary
      setCartItemCount(updatedCart.reduce((count, item) => count + item.quantity, 0));
      return updatedCart;
    });
  };

  const decrementItem = (key) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.map((item) => {
        if (item.key === key) {
          let newQuantity = Math.max((item.quantity || 0) - 1, 1); // Ensure quantity doesn't go below 1
          
          if (item.checked) {
            // Restore epoints if item is checked
            if (userEpoint < initialEpoint) {
              const newEpoint = Math.min(userEpoint + 100, initialEpoint);
              setUserEpoint(newEpoint); // Set epoint back
            }
          }
  
          // Update item quantity and cart item count
          const newCartItemCount = prevItems.reduce((count, item) => {
            return item.key === key ? count + newQuantity : count + (item.quantity || 0);
          }, 0);
  
          setCartItemCount(newCartItemCount);
  
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
