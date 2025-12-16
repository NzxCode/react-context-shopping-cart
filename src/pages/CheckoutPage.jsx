import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function CheckoutPage() {
    const { cart } = useContext(CartContext);

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    const [formData, setformData] = useState({
        name: "",
        whatsapp: "",
        address: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="p-8 container mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">Formulir Pembayaran</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                
                <div className="bg-white p-6 shadow rounded-lg border">
                    <h2 className="text-xl font-bold mb-4">Data Pembeli</h2>
                    <form className="space-y-4">
                        
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Nama Lengkap</label>
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                placeholder="Contoh: Nicolas"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Nomor WhatsApp</label>
                            <input 
                            type="number"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleChange} 
                            className="w-full border p-2 rounded" 
                            placeholder="08xxxxxxxx" />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Alamat Pengiriman</label>
                            <textarea 
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full border p-2 rounded" 
                            rows="3" 
                            placeholder="Jalan, RT/RW...">
                            </textarea>
                        </div>
                    </form>
                </div>

                <div className="bg-gray-50 p-6 shadow rounded-lg border h-fit">
                    <h2 className="text-xl font-bold mb-4">Ringkasan Belanja</h2>
                    
                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                        {cart.map((item, index) => (
                            <div key={index} className="flex justify-between">
                                <span>{item.name}</span>
                                <span>Rp {item.price.toLocaleString("id-ID")}</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4 flex justify-between font-bold text-lg">
                        <span>Total Bayar:</span>
                        <span className="text-blue-600">Rp {totalPrice.toLocaleString("id-ID")}</span>
                    </div>

                    <button className="w-full mt-6 bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700 transition">
                        BAYAR SEKARANG
                    </button>
                </div>
            </div>
        </div>
    );
}