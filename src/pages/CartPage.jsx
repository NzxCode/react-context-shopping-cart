import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartPage() {
    const { cart } = useContext(CartContext);
    const totalPrice = cart.reduce((acc, item) => {
        return acc + item.price;
    }, 0);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Keranjang Belanjaan</h1>

            {cart.length === 0 ? (
                <div className="text-center mt-10">
                    <p className="text-xl text-gray-500">Keranjang masih kosong...</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {cart.map((item, index) => (
                        <div key={index} className="border p-4 shadow-sm rounded bg-white flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-semibold">{item.name}</h3>
                                <p className="text-gray-600">Rp {item.price.toLocaleString("id-ID")}</p>
                            </div>
                            <button className="text-red-500 text-sm hover:underline">
                                Hapus
                            </button>
                        </div>
                    ))}
                    <div className="mt-6 border-t pt-4 text-right">
                        <h2 className="text-xl font-bold">
                            Total harga : Rp {totalPrice.toLocaleString("id-ID")}
                        </h2>
                    </div>
                </div>
            )}
        </div>
    );
}