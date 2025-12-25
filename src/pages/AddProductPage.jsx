import { useState } from "react";
import { db, storage } from "../firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

function AddProductPage() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null); 
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imageFile) {
            alert("Silakan pilih gambar produk.");
            return;
        }
        setLoading(true);
        
        try {
            const storageRef = ref(storage, `images/${Date.now()}_${imageFile.name}`);
            const snapshot = await uploadBytes(storageRef, imageFile);
            console.log("Upload foto sukses!");
            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log("Link Foto:", downloadURL);
            await addDoc(collection(db, "products"), {
                name: name,
                price: Number(price),
                image: downloadURL,
                description: description
            });
            alert("Produk berhasil ditambahkan!");
            navigate("/admin");
        } catch (error) {
            console.error("Gagal Upload:", error);
            alert("Waduh error saat upload: " + error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="container mx-auto p-8 max-w-lg">
            <h1 className="text-2xl font-bold mb-6">Tambah Produk Baru</h1>
            
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
                <div>
                    <label className="block text-sm font-bold mb-1">Foto Produk</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full border p-2 rounded bg-gray-50"
                    />
                </div>
                {preview && (
                <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500 mb-2">Preview Tampilan:</p>
                        <img 
                            src={preview} 
                            alt="Preview" 
                            className="w-full h-64 object-cover rounded border-2 border-dashed border-gray-300"
                        />
                </div>
                )}
                <div>
                    <label className="block text-sm font-bold mb-1">Nama Produk</label>
                    <input 
                        type="text" 
                        className="w-full border p-2 rounded" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Harga (Rupiah)</label>
                    <input 
                        type="number" 
                        className="w-full border p-2 rounded" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Deskripsi Singkat</label>
                    <textarea 
                        className="w-full border p-2 rounded" 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>

                <button 
                    disabled={loading}
                    className="w-full bg-purple-600 text-white py-3 rounded font-bold hover:bg-purple-700 transition">
                    {loading ? "Sedang Mengupload..." : "UPLOAD & SIMPAN"}
                </button>
            </form>
        </div>
    );
}

export default AddProductPage;