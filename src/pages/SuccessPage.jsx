import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center p-6 bg-gray-50">
            <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full border">
                <div className="text-green-500 text-6xl mb-4">
                    ✓
                </div>
                
                <h1 className="text-3xl font-bold mb-2 text-gray-800">Pembayaran Berhasil!</h1>
                <p className="text-gray-600 mb-8">
                    Terima kasih telah berbelanja. Pesanan Anda sedang kami proses dan tim kami akan segera menghubungi Anda via WhatsApp.
                </p>

                <button 
                    onClick={() => navigate("/")}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition w-full"
                >
                    KEMBALI KE BERANDA
                </button>
            </div>
        </div>
    );
}