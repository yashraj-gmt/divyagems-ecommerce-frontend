import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        const maxStock = product.stockQuantity !== undefined ? product.stockQuantity : 99;
        const nextQty = Math.min((existing.quantity || 1) + 1, maxStock);
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: nextQty } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prev) => 
      prev.map(item => 
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
