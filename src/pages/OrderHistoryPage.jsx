import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext"; // Hapus auth context

function OrderHistoryPage() {
    // Fake user karena offline
    const currentUser = { uid: "guest_user" }; 
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const formatDate = (dateString) => {
        if (!dateString) return "Tanggal tidak tersedia";
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    useEffect(() => {
        const fetchOrders = () => {
            try {
                // AMBIL DATA ORDER DARI LOCAL STORAGE
                const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
                
                // Urutkan dari yang terbaru (kalau ada field createdAt)
                const sortedOrders = storedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                setOrders(sortedOrders);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, []);

    if (loading) return <div className="p-10 text-center">Sedang mengambil data riwayat...</div>;

    return (
        <div className="container mx-auto p-4 md:p-8 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Riwayat Pesanan Saya (Offline)</h1>

            {orders.length === 0 ? (
                <div className="text-center bg-white p-10 rounded-lg shadow border">
                    <p className="text-gray-500 text-lg mb-4">Belum ada riwayat belanja di memori browser ini.</p>
                    <a href="/" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
                        Yuk Belanja Dulu
                    </a>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
                            
                            <div className="bg-gray-100 px-6 py-4 border-b flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-bold text-gray-700">
                                        {formatDate(order.createdAt)}
                                    </p>
                                    <p className="text-xs text-gray-500">ID: {order.id}</p>
                                </div>
                                <div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        order.status === "Selesai" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                                    }`}>
                                        {order.status || "Pending"}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="font-semibold text-gray-700 mb-3 text-sm">Barang yang dibeli:</h3>
                                <div className="space-y-2 mb-4">
                                    {order.items?.map((item, index) => (
                                        <div key={index} className="flex justify-between text-sm text-gray-600 border-b border-dashed pb-2 last:border-0">
                                            <span>{item.name} <span className="text-gray-400 text-xs">x{item.quantity || 1}</span></span>
                                            <span>Rp {item.price.toLocaleString("id-ID")}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center pt-4 border-t mt-4">
                                    <div className="text-sm text-gray-600">
                                        <p>Dikirim ke:</p>
                                        <p className="font-medium text-gray-900">
                                            {order.shippingDetails?.address || order.customerInfo?.address || "Alamat Lokal"}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500">Total Belanja</p>
                                        <p className="text-xl font-bold text-blue-600">
                                            Rp {order.totalAmount ? order.totalAmount.toLocaleString("id-ID") : order.totalPrice?.toLocaleString("id-ID")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OrderHistoryPage;