import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();
    // const { login } = useAuth(); // Opsional kalau pakai context
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");

        try {
            // 1. Ambil database user dari LocalStorage
            const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

            // 2. Cari user yang cocok
            const foundUser = existingUsers.find(
                user => user.email === email && user.password === password
            );

            if (foundUser) {
                // LOGIN BERHASIL!
                // Simpan sesi login sederhana
                localStorage.setItem("activeUser", JSON.stringify(foundUser));
                
                alert("Login Berhasil! Selamat datang " + foundUser.email);
                navigate("/"); // Pindah ke Home
            } else {
                setError("Email atau Password salah!");
            }

        } catch (err) {
            setError("Terjadi kesalahan sistem.");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Login Toko (Offline)</h2>
                
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}
                
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email" 
                            className="w-full border p-2 rounded mt-1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password" 
                            className="w-full border p-2 rounded mt-1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700">
                        Masuk
                    </button>
                </form>
                <p className="text-center mt-4 text-sm">
                    Belum punya akun? <Link to="/register" className="text-blue-600 font-bold">Daftar disini</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;