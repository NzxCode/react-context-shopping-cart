import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
    const { cart } = useContext(CartContext);
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    return (
        <div className="p-8 container mx-auto">
            <div className="mt-8">
                <h3 className="text-xl font-bold text-right">
                    Total harga : Rp {totalPrice.toLocaleString("id-ID")}
                </h3>
                <div className="text-right mt-4">
                    <Link to="/checkout">
                        <button className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700">
                            Lanjut ke Pembayaran 👉
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}