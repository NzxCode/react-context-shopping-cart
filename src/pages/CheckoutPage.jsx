import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext"; 
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
    const { cart, totalPrice, clearCart } = useContext(CartContext);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [shipping, setShipping] = useState({
        name: "",
        phone: "",
        address: ""
    });

    const handleCheckout = (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            alert("Keranjang kosong!");
            return;
        }

        const newOrder = {
            id: "ORD-" + Date.now(),
            userId: currentUser ? currentUser.id : "guest",
            items: cart,
            totalAmount: totalPrice,
            status: "Diproses",
            createdAt: new Date().toISOString(),
            shippingDetails: shipping
        };

        try {
            const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
            const updatedOrders = [...existingOrders, newOrder];
            localStorage.setItem("orders", JSON.stringify(updatedOrders));

            clearCart();
            
            alert("Pembayaran Berhasil! Pesanan sedang diproses.");
            navigate("/order-history");

        } catch (error) {
            console.error(error);
            alert("Gagal memproses pesanan.");
        }
    };

    return (
        <div className="container mx-auto p-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-center">Checkout / Pembayaran</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Kolom Kiri: Form Alamat */}
                <div className="bg-white p-6 rounded shadow border">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">Alamat Pengiriman</h2>
                    <form id="checkoutForm" onSubmit={handleCheckout} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-1">Nama Penerima</label>
                            <input 
                                type="text" required 
                                className="w-full border p-2 rounded"
                                value={shipping.name}
                                onChange={(e) => setShipping({...shipping, name: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">No. WhatsApp</label>
                            <input 
                                type="tel" required 
                                className="w-full border p-2 rounded"
                                value={shipping.phone}
                                onChange={(e) => setShipping({...shipping, phone: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">Alamat Lengkap</label>
                            <textarea 
                                required 
                                className="w-full border p-2 rounded h-24"
                                value={shipping.address}
                                onChange={(e) => setShipping({...shipping, address: e.target.value})}
                            ></textarea>
                        </div>
                    </form>
                </div>

                {/* Kolom Kanan: Ringkasan Pesanan */}
                <div className="bg-gray-50 p-6 rounded shadow border h-fit">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">Ringkasan Pesanan</h2>
                    <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
                        {cart.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                                <span>{item.name} <span className="text-gray-500">x1</span></span>
                                <span>Rp {item.price.toLocaleString("id-ID")}</span>
                            </div>
                        ))}
                    </div>
                    
                    <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between font-bold text-lg mb-6">
                            <span>Total Bayar</span>
                            <span className="text-purple-600">Rp {totalPrice.toLocaleString("id-ID")}</span>
                        </div>
                        
                        <button 
                            form="checkoutForm"
                            className="w-full bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700 transition shadow-lg"
                        >
                            BAYAR SEKARANG
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;