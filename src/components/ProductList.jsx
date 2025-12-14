import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const products = [
    { id: 1, name: "Laptop Gaming", price: "Rp 17.500.000"},
    { id: 2, name: "PS5", price: "Rp 9.500.000"},
    { id: 3, name: "Mouse Wireless", price: "Rp 500.000"},
];

export default function ProductList() {
    const { addToCart } = useContext(CartContext);
    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {products.map((product) => (
                <div key={product.id} className="border p-4 rounded shadow-lg">
                    <Link to={`/product/${product.id}`}>
                        <h3 className="font-bold text-xl mb-2 hover:text-green-400 cursor-pointer">
                            {product.name}
                        </h3>
                    </Link>
                <p className="text-gray-600 mb-4">{product.price}</p>
                <button onClick={addToCart} className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600 transition">
                    Buy Now!
                </button>
            </div>
            ))} 
        </div>
    );
}