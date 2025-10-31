import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // Carregar carrinho do localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Salvar carrinho no localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (produto, quantidade = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.produto.id === produto.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        );
      } else {
        return [...prevItems, { produto, quantidade }];
      }
    });
  };

  const removeItem = (produtoId) => {
    setItems(prevItems => prevItems.filter(item => item.produto.id !== produtoId));
  };

  const updateQuantity = (produtoId, quantidade) => {
    if (quantidade <= 0) {
      removeItem(produtoId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.produto.id === produtoId
          ? { ...item, quantidade }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotal = () => {
    return items.reduce((total, item) => {
      return total + (item.produto.preco * item.quantidade);
    }, 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantidade, 0);
  };

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
