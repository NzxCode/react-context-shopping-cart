import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            // Cek apakah barang sudah ada?
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                alert("Barang ini sudah ada di keranjang!");
                return prevCart;
            } else {
                alert("Berhasil masuk keranjang!");
                return [...prevCart, product];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const totalPrice = cart.reduce((total, item) => total + Number(item.price), 0);

    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            removeFromCart, 
            clearCart, 
            totalPrice // <-- INI YANG TADI HILANG
        }}>
            {children}
        </CartContext.Provider>
    );
}