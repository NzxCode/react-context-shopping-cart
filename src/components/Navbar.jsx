import { useContext } from 'react'
import { CartContext } from '../context/CartContext';
import { Link } from "react-router-dom";

function Navbar() {
    const {cart} = useContext(CartContext);

    return (
        <nav className="flex justify-between items-center bg-purple-600 p-4 text-white">
            <Link to="/" className="text-2xl font-bold decoration-none text-white">
                Toko Sembako Nico
            </Link>
            <Link to="/about" className="text-2xl font-semibold decoration-none text-white">
                Tentang Toko Ini!
            </Link>
            <Link to="/cart" className="text-lg font-semibold decoration-none text-white">
                Keranjang : {cart.length}
            </Link>
        </nav>
    )
}

export default Navbar;