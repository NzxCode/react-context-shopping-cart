import { Navigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext.jsx';

function AdminRoute({ children }) {
    const { currentUser, loading } = useAuth();
    const adminEmail = "gabnicol0807@gmail.com";

    if (loading) {
        return <div className="p-10 text-center">Cek akses admin....</div>;
    }

    if (!currentUser || currentUser.email !== adminEmail) {
        return <Navigate to="/" replace />;
    }
    return children;
}

export default AdminRoute;