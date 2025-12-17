import { useParams } from "react-router-dom";
import { products } from "../data/product";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
export default function DetailPage() {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
    const product = products.find((p) => p.id === parseInt(id));

    if (!product) {
        return <div>Produk tidak ditemukan!</div>
    }

    return (
        <div className="container mx-auto p-8">
            <img src={product.image} alt={product.name} className="w-full max-h-96 object-cover mb-8" />
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-xl text-blue-600 font-bold mb-4">
                Rp {product.price.toLocaleString("id-ID")}
            </p>
            <p className="text-gray-700">{product.description}</p>
            <button onClick={() => addToCart(product)} className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-bold">
                + Keranjang
            </button>
        </div>
    );
}