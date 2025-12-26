import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RegisterPage() {
    const navigate = useNavigate();
    const { signup } = useAuth();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (password.length < 6) {
            return setError("Password minimal 6 karakter.");
        }

        try {
            setLoading(true);
            await signup(email, password);
            alert("Berhasil mendaftar! Silakan login.");
            navigate("/login");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-purple-600">Register</h2>
                
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}
                
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input 
                            type="email" 
                            required 
                            className="w-full border p-2 rounded" 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input 
                            type="password" 
                            required 
                            className="w-full border p-2 rounded" 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <button 
                        disabled={loading} 
                        className="w-full bg-purple-600 text-white py-2 rounded font-bold hover:bg-purple-700"
                    >
                        {loading ? "Loading..." : "Daftar Sekarang"}
                    </button>
                </form>
                <p className="text-center mt-4 text-sm">
                    Sudah punya akun? <Link to="/login" className="text-purple-600 font-bold">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;