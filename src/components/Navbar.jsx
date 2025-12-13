import { useContext } from 'react'
import { CartContext } from '../context/CartContext';

function Navbar() {
    const {cart} = useContext(CartContext);

    return (
        <nav className="flex justify-between items-center bg-purple-600 p-4 text-white">
            <h1 className="text-2xl font-bold">
                Toko Sembako Nico
            </h1>
            <div className="text-lg font-semibold">
                Keranjang: {cart}
            </div>

        </nav>
    )
}

export default Navbar;