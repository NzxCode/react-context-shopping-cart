import { useState} from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            await signup(email, password);
            navigate("/");
        } catch (error) {
            setError("Gagal mendaftar. Password minimal 6 karakter?");
        }
        setLoading(false);
    }
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Daftar Akun</h2>
                {error && <div className="bg-red-100 text-red-700 p-2 mb-4 text-sm rounded">{error}</div>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="border p-2 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Isi Password"
                        className="border p-2 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:opacity-50"
                    >
                        {loading ? "Mendaftar..." : "Daftar Sekarang"}
                    </button>
                </form>
                <div className="mt-4 text-center text-sm">
                    Sudah punya akun? <Link to="/login" className="text-blue-600 hover:underline">Login di sini</Link> 
                </div>
            </div>
        </div>
    );
};