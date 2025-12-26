import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            setLoading(true);
            await login(email, password);
            alert("Login Berhasil!");
            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Login</h2>
                
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}
                
                <form onSubmit={handleLogin} className="space-y-4">
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
                        className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700"
                    >
                        {loading ? "Loading..." : "Masuk"}
                    </button>
                </form>
                <p className="text-center mt-4 text-sm">
                    Belum punya akun? <Link to="/register" className="text-blue-600 font-bold">Daftar</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;