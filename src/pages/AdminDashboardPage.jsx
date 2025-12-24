import { useAuth } from "../context/AuthContext";

export default function AdminDashboardPage() {
    const { currentUser } = useAuth();

    return (
        <div className="container mx-auto p-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-600">
                <h1 className="text-3xl font-bold mb-2">👋 Selamat Datang, Bos Nico!</h1>
                <p className="text-gray-600">
                    Ini adalah Halaman Admin Rahasia. Hanya email <strong>{currentUser?.email}</strong> yang bisa masuk sini.
                </p>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Nanti kita isi fitur CRUD disini */}
                    <div className="bg-blue-100 p-6 rounded-lg text-center">
                        <h3 className="font-bold text-blue-700 text-xl">Total Produk</h3>
                        <p className="text-3xl font-bold mt-2">10</p>
                    </div>
                </div>
            </div>
        </div>
    );
}