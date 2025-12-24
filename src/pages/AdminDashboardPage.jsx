import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { link } from "react-router-dom";

function AdminDashboardPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const dataGudang = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProducts(dataGudang);
            } catch (error) {
                console.error("Gagal mengambil data produk:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);
    const handleDelete = async (id) => {
        if(!window.confirm("Yakin ingin menghapus produk ini?")) return;
        try {
            await deleteDoc(doc(db, "products", id));
            setProducts(products.filter(product => product.id !== id));
            alert("Produk berhasil dihapus!");
        } catch (error) {
            console.error("Gagal menghapus produk:", error);
            alert("Gagal menghapus produk. Coba lagi.");
        }
    }
    if (loading) return <div className="p-10 text-center">Sedang mengecek gudang...</div>;

    return (
        <div className="container mx-auto p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">📦 Gudang Produk (Admin)</h1>
                <Link to="/admin/add-product" className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-700 transition">
                    + Tambah Produk Baru
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="p-4">Foto</th>
                            <th className="p-4">Nama Produk</th>
                            <th className="p-4">Harga</th>
                            <th className="p-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-10 text-center text-gray-500">
                                    Gudang kosong melompong. Tambah barang dulu yuk!
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4">
                                        <img src={product.image} alt="foto" className="w-12 h-12 object-cover rounded border"/>
                                    </td>
                                    <td className="p-4 font-bold">{product.name}</td>
                                    <td className="p-4">Rp {product.price.toLocaleString("id-ID")}</td>
                                    <td className="p-4 text-center">
                                        <button 
                                            onClick={() => handleDelete(product.id)}
                                            className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition font-bold">
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}