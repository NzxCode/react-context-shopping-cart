import { useContext } from 'react'
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext.jsx';
import { Link } from "react-router-dom";

function Navbar() {
    const {cart} = useContext(CartContext);
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

async function handleLogout() {
    try {
        await logout();
        navigate("/login");
    } catch (error) {
        console.log("Gagal logout:", error);
    }
}

    return (
        <nav className='flex justify-between items-center bg-purple-600 p-4 text-white sticky top-0 z-50 shadow-md'>
            <Link to="/" className='text-2xl font-bold hover:text-purple-300'>Toko Sembako Nico</Link>
             <div className="flex items-center gap-6">
                {currentUser ? (
                    <div className="flex items-center gap-4 border-r pr-4 border-purple-400">
                        <span className="font-medium">Halo, {currentUser.email}
                        </span>
                        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm">
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="bg-green-500 px-3 py-1 rounded hover:bg-green-600 text-sm">
                        Login Masuk
                    </Link>
                )}
                <Link to="/about" className='relative hover:text-purple-300'>
                    Tentang Toko Kami
                </Link>
                <Link to="/cart" className='relative hover:text-purple-300'>
                    Keranjang : {cart.length}
                </Link>
                <Link to="/history" className="text-white hover:text-yellow-300 font-semibold transition">
                    Riwayat
                </Link>
             </div>
        </nav>
    );
}
export default Navbar;