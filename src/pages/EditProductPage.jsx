import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
        const fetchProduct = () => {
            try {
                const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
                const foundProduct = storedProducts.find(p => p.id === id);

                if (foundProduct) {
                    setForm({
                        name: foundProduct.name,
                        price: foundProduct.price, 
                        image: foundProduct.image,
                        description: foundProduct.description || ""
                    });
                } else {
                    alert("Produk tidak ditemukan!");
                    navigate("/admin");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id, navigate]); 

    const handleUpdate = (e) => {
        e.preventDefault();
        
        try {
            const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
            
            const updatedProducts = storedProducts.map(product => {
                if (product.id === id) {
                    return {
                        ...product,
                        name: form.name,
                        price: Number(form.price),
                        image: form.image,
                        description: form.description
                    };
                }
                return product;
            });

            localStorage.setItem("products", JSON.stringify(updatedProducts));

            alert("Produk berhasil diperbarui!");
            navigate("/admin"); 
        } catch (error) {
            console.error(error);
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
                    <label className="block text-sm font-bold mb-1">Preview Gambar</label>
                    <img src={form.image} alt="preview" className="w-20 h-20 object-cover mb-2 border"/>
                    <input 
                        type="text" 
                        className="w-full border p-2 rounded bg-gray-200 text-gray-500" 
                        value="Hapus dan buat baru untuk ganti gambar"
                        disabled
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

export default EditProductPage;