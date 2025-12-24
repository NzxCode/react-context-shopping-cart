import { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.js";

function EditProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        name: "",
        price: "",
        image: "",
        description: ""
    });
    useEffect(() => {
        async function fetchProduct() {
            try {
                const docRef = doc(db, "products", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setForm({
                        name: data.name,
                        price: data.price, 
                        image: data.image,
                        description: data.description || ""
                    });
                } else {
                    alert("Produk tidak ditemukan!");
                    navigate("/admin");
                }
            } catch (error) {
                console.error("Gagal ambil data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]); 
    const handleUpdate = async (e) => {
        e.preventDefault();
        
        try {
            const docRef = doc(db, "products", id);
            await updateDoc(docRef, {
                ...form,
                price: Number(form.price)
            });

            alert("Produk berhasil diperbarui! ✨");
            navigate("/admin"); 
        } catch (error) {
            console.error("Gagal update:", error);
            alert("Gagal update produk.");
        }
    };

    if (loading) return <div className="p-10 text-center">Mengambil data lama...</div>;

    return (
        <div className="container mx-auto p-8 max-w-lg">
            <h1 className="text-2xl font-bold mb-6">Edit Produk</h1>
            
            <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow space-y-4">
                <div>
                    <label className="block text-sm font-bold mb-1">Nama Produk</label>
                    <input 
                        type="text" 
                        className="w-full border p-2 rounded bg-gray-50" 
                        value={form.name}
                        onChange={(e) => setForm({...form, name: e.target.value})}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Harga</label>
                    <input 
                        type="number" 
                        className="w-full border p-2 rounded bg-gray-50" 
                        value={form.price}
                        onChange={(e) => setForm({...form, price: e.target.value})}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">URL Gambar</label>
                    <input 
                        type="text" 
                        className="w-full border p-2 rounded bg-gray-50" 
                        value={form.image}
                        onChange={(e) => setForm({...form, image: e.target.value})}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Deskripsi</label>
                    <textarea 
                        className="w-full border p-2 rounded bg-gray-50" 
                        value={form.description}
                        onChange={(e) => setForm({...form, description: e.target.value})}
                    ></textarea>
                </div>

                <button className="w-full bg-yellow-500 text-white py-3 rounded font-bold hover:bg-yellow-600 transition">
                    UPDATE PRODUK
                </button>
            </form>
        </div>
    );
}