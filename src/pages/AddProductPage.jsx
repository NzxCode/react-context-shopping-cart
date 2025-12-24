import { useState } from "react";
import { db } from "../firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function AddProductPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        price: "",
        image: "",
        description: ""
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...form,
                price: Number(form.price)
            };
            await addDoc(collection(db, "products"), payload);
            alert("Produk berhasil ditambahkan!");
            navigate("/admin");
        } catch (error) {
            console.error("Gagal tambah produk:", error);
            alert("Gagal tambah produk. Coba lagi.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="container mx-auto p-8 max-w-lg">
            <h1 className="text-2xl font-bold mb-6">➕ Tambah Produk Baru</h1>
            
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
                <div>
                    <label className="block text-sm font-bold mb-1">Nama Produk</label>
                    <input 
                        type="text" 
                        className="w-full border p-2 rounded" 
                        value={form.name}
                        onChange={(e) => setForm({...form, name: e.target.value})}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Harga (Rupiah)</label>
                    <input 
                        type="number" 
                        className="w-full border p-2 rounded" 
                        value={form.price}
                        onChange={(e) => setForm({...form, price: e.target.value})}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">URL Gambar (Link Foto)</label>
                    <input 
                        type="text" 
                        className="w-full border p-2 rounded" 
                        placeholder="https://contoh.com/foto.jpg"
                        value={form.image}
                        onChange={(e) => setForm({...form, image: e.target.value})}
                        required
                    />
                    <p className="text-xs text-gray-400 mt-1">*Cari gambar di Google, klik kanan 'Copy Image Link'</p>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Deskripsi Singkat</label>
                    <textarea 
                        className="w-full border p-2 rounded" 
                        value={form.description}
                        onChange={(e) => setForm({...form, description: e.target.value})}
                    ></textarea>
                </div>

                <button 
                    disabled={loading}
                    className="w-full bg-purple-600 text-white py-3 rounded font-bold hover:bg-purple-700 transition">
                    {loading ? "Menyimpan..." : "SIMPAN PRODUK"}
                </button>
            </form>
        </div>
    );
}

export default AddProductPage;