import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
export default function DetailPage() {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

useEffect(() => {
        const ambilSatuProduk = async () => {
            try {
                const docRef = doc(db, "products", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProduct({ id: docSnap.id, ...docSnap.data() });
                } else {
                }
            } catch (error) {
                console.error("Gagal ambil detail:", error);
            } finally {
                setLoading(false); 
            }
        };

        ambilSatuProduk();
    }, [id]);

    if (loading) {
        return <div className="text-center mt-20 text-xl font-bold">Sedang memuat data... ⏳</div>;
    }

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