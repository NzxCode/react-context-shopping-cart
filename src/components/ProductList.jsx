import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const products = [
    { id: 1, name: "Laptop Gaming", price: 17500000},
    { id: 2, name: "PS5", price: 9500000},
    { id: 3, name: "Mouse Wireless", price: 500000},
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
                <p className="text-gray-600 mb-4">Rp {product.price.toLocaleString("id-ID")}</p>
                <button onClick={() => addToCart(product)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Masukkan Keranjang
                </button>
            </div>
            ))} 
        </div>
    );
}