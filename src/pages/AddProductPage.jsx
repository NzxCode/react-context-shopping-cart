import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProductPage() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Laptop");
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null); 
    const [loading, setLoading] = useState(false);

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            let imageUrl = "";

            if (imageFile) {
                if (imageFile.size > 2 * 1024 * 1024) {
                    throw new Error("Ukuran gambar terlalu besar! Maksimal 2MB.");
                }
                imageUrl = await convertToBase64(imageFile);
            } else {
                imageUrl = "https://via.placeholder.com/150"; 
            }

            const newProduct = {
                id: Date.now().toString(), 
                name: name,
                price: Number(price),
                image: imageUrl,
                description: description,
                category: category,
                createdAt: new Date().toISOString()
            };

            const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
            const updatedProducts = [...existingProducts, newProduct];

            localStorage.setItem("products", JSON.stringify(updatedProducts));

            alert("Produk berhasil ditambahkan!");
            navigate("/admin");

        } catch (error) {
            console.error(error);
            alert("Gagal menyimpan: " + error.message);
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
                    {preview && (
                        <img src={preview} alt="Preview" className="mt-2 w-full h-48 object-cover rounded"/>
                    )}
                </div>
                
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
                    <label className="block text-sm font-bold mb-1">Kategori</label>
                    <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border p-2 rounded bg-white"
                    >
                        <option value="Mic">Mic</option>
                        <option value="Headphone">Headphone</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Smartphone">Smartphone</option>
                        <option value="Elektronik">Elektronik</option>
                    </select>
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
                    {loading ? "Sedang Menyimpan..." : "SIMPAN"}
                </button>
            </form>
        </div>
    );
}

export default AddProductPage;