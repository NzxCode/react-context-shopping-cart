import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        setError("");

        // 1. Validasi Password Manual
        if (password.length < 6) {
            setError("Password minimal harus 6 karakter ya!");
            return;
        }

        try {
            // 2. Ambil data user yang sudah ada (kalau ada)
            const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

            // 3. Cek apakah email sudah terdaftar?
            const isDuplicate = existingUsers.some(user => user.email === email);
            if (isDuplicate) {
                setError("Email ini sudah terdaftar. Coba login saja.");
                return;
            }

            // 4. Buat User Baru
            const newUser = {
                email: email,
                password: password, // Di dunia nyata ini harus di-enkripsi, tapi untuk offline gpp.
                role: "user" // Default jadi user biasa
            };

            // 5. Simpan ke LocalStorage
            existingUsers.push(newUser);
            localStorage.setItem("users", JSON.stringify(existingUsers));

            alert("Hore! Pendaftaran berhasil. Silakan login.");
            navigate("/login");

        } catch (err) {
            setError("Gagal mendaftar. Coba lagi.");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-purple-600">Daftar Akun (Offline)</h2>
                
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}
                
                <form onSubmit={handleRegister} className="space-y-4">
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
                        <p className="text-xs text-gray-500 mt-1">*Minimal 6 karakter</p>
                    </div>
                    <button className="w-full bg-purple-600 text-white py-2 rounded font-bold hover:bg-purple-700">
                        Daftar Sekarang
                    </button>
                </form>
                <p className="text-center mt-4 text-sm">
                    Sudah punya akun? <Link to="/login" className="text-purple-600 font-bold">Login disini</Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;