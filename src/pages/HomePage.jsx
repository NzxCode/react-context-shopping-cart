import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom"; 
import { db } from "../firebase"; 
import { collection, getDocs } from "firebase/firestore";

export default function HomePage() {
    const { currentUser } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("Semua");
    const [sortBy, setSortBy] = useState("Terbaru");

    useEffect(() => {
        async function fetchProducts() {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProducts(data);
            } catch (error) {
                console.error("Gagal mengambil data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    const filteredProducts = products
        .filter((product) => {
            if (category === "Semua") return true;
            return product.category === category;
        })

        .filter((product) => {
            return product.name.toLowerCase().includes(keyword.toLowerCase());
        })
        
        .sort((a, b) => {
            if (sortBy === "termurah") return a.price - b.price;
            if (sortBy === "termahal") return b.price - a.price;
            if (sortBy === "az") return a.name.localeCompare(b.name);
            if (sortBy === "za") return b.name.localeCompare(a.name);
            return 0;
        });

    if (loading) return <div className="p-10 text-center">Sedang memuat rak toko...</div>;

    return (
        <div className="container mx-auto p-4 md:p-8 min-h-screen">
            <div className="bg-purple-600 text-white p-8 rounded-2xl shadow-lg mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    Selamat Datang, {currentUser ? currentUser.email.split('@')[0] : "Pelanggan"}!
                </h1>
                <p className="text-purple-100">Temukan kebutuhan harianmu dengan harga terbaik disini.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border mb-8 sticky top-20 z-10">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="w-full md:w-1/3 relative">
                        <input 
                            type="text"
                            placeholder="Cari barang elektronik..."
                            className="w-full border pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <span className="absolute left-3 top-2.5 text-gray-400"></span>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                        {["Semua", "Laptop", "Smartphone", "Mic", "Headphone", "Elektronik"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition ${
                                    category === cat ? "bg-purple-600 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                                >
                                    {cat}
                                </button>
                        ))}

                    </div>
                        <div className="w-full md:w-auto">
                        <select 
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border p-2 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-purple-500 cursor-pointer"
                        >
                            <option value="termurah">Harga Termurah</option>
                            <option value="termahal">Harga Termahal</option>
                            <option value="az">Nama A-Z</option>
                            <option value="za">Nama Z-A</option>
                        </select>
                    </div>

                </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">Daftar Produk ({filteredProducts.length})</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden flex flex-col">
                        <div className="h-48 bg-gray-100 relative">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        {product.category && (
                                <span className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                    {product.category}
                                </span>
                        )}
                    </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h3 className="font-bold text-lg text-gray-800 mb-1 truncate">{product.name}</h3>
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description || "Tidak ada deskripsi"}</p>
                            
                            <div className="mt-auto flex justify-between items-center">
                                <span className="text-purple-700 font-bold text-lg">
                                    Rp {product.price.toLocaleString("id-ID")}
                                </span>
                                <Link to={`/product/${product.id}`} className="bg-purple-100 text-purple-700 p-2 rounded-full hover:bg-purple-200 transition">
                                    🛒
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-6xl mb-4">Tidak Ditemukan</p>
                    <h3 className="text-xl font-bold text-gray-700">Barang tidak ditemukan</h3>
                    <p className="text-gray-500">Tidak ada produk {keyword} di kategori "{category}"</p>
                    <button onClick={() => {setKeyword(""); setCategory("Semua")}} className="text-purple-600 underline mt-2">
                        Reset Pencarian
                    </button>
                </div>
            )}
        </div>
    );  
}