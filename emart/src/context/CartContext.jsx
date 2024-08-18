import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { userId, userEpoint, setUserEpoint, cartItemCount, setCartItemCount } = useContext(UserContext);
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
      // Find if the product already exists in the cart
      const existingProduct = prevItems.find((item) => item.key === product.key);
      
      // Create updated cart based on the existence of the product
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
  
      // Update the cart items
      updateCartItems(updatedCart);
  
      // Calculate new cart item count
      const newCartItemCount = updatedCart.reduce((count, item) => count + item.quantity, 0);
      
      // Update cart item count state
      setCartItemCount(newCartItemCount);
      
      // Log the updated item count
      console.log('Item count after adding:', newCartItemCount);
  
      return updatedCart;
    });
  };
  

  const removeFromCart = (key) => {
    console.log('item count before removal:', cartItemCount);
    setCartItems((prevItems) => {
      // Find the item to remove
      const itemToRemove = prevItems.find((item) => item.key === key);
  
      if (itemToRemove) {
        // Calculate the quantity to subtract from the cart item count
        const quantityToRemove = itemToRemove.quantity || 0;
  
        console.log('Removing item:', itemToRemove);
        console.log('Quantity to remove:', quantityToRemove);
  
        // Remove the item from the cart
        const updatedCart = prevItems.filter((item) => item.key !== key);
  
        // Update the cart item count
        setCartItemCount((prevCount) => {
          const newCount = Math.max(prevCount - quantityToRemove, 0);
          console.log('Updated cart item count:', newCount);
          return newCount;
        });
  
        // Restore epoints if the item was checked
        if (itemToRemove.checked) {
          setUserEpoint(initialEpoint);
        }
  
        // Update cart items in sessionStorage
        updateCartItems(updatedCart);
  
        return updatedCart;
      }
  
      console.log('Item not found:', key);
      return prevItems;
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
      console.log('item count after increment:', cartItemCount);
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
