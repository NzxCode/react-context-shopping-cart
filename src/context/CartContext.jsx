import { createContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("keranjang_nico");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("keranjang_nico", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart([...cart, product]);
        console.log("Product didalam cart-nya :", product);
    }

    const cleanCart = () => {
        setCart([]);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, cleanCart}}>
            {children}
        </CartContext.Provider>
    );
};