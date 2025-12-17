import { useContext } from "react";
import { CartContext } from "../context/CartContext"; 
import { products } from "../data/products"; 
import { Link } from "react-router-dom"; 

export default function HomePage() {
    const { addToCart } = useContext(CartContext);

    return (
        <div className="p-8 container mx-auto">
            <h1 className="text-3xl font-bold mb-2 text-center text-blue-600">
                Selamat Datang di Toko Ini
            </h1>
            <p className="text-center text-gray-500 mb-8">
                Toko sembako satu-satunya di hatimu!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {products.map((product) => (
                    <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden border">

                        <Link to={`/product/${product.id}`}>
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition"
                            />
                        </Link>

                        <div className="p-4">
                            <Link to={`/product/${product.id}`}>
                                <h2 className="text-xl font-bold mb-2 cursor-pointer hover:text-blue-600">
                                    {product.name}
                                </h2>
                            </Link>
                            
                            <p className="text-gray-600 mb-4 font-semibold">
                                Rp {product.price.toLocaleString("id-ID")}
                            </p>

                            <button 
                                onClick={() => addToCart(product)}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full font-bold"
                            >
                                + Keranjang
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}