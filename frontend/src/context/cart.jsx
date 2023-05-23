import { useState, useContext, createContext, useEffect } from "react";
const CartContext = createContext();
// auth provider

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // at initial times we get cartItems from local storage and set the Cart Items
    let cartItems = localStorage.getItem("cart");
    if (cartItems) setCart(JSON.parse(cartItems));
  }, []);

  return (
    // returning the provide from context api so that it can be used anywhere in the app
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);
export { useCart, CartProvider };
