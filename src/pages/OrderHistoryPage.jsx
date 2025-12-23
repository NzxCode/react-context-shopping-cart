import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

function OrderHistoryPage() {
    const { currentUser } = useAuth();
    const [ orders, setOrders ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        if (!currentUser) return;

        async function fetchOrders() {
            try {
                const ordersRef = collection(db, "orders");
                const q = query(
                    ordersRef, 
                    where("userId", "==", currentUser.uid), 
                    orderBy("createdAt", "desc")
                );
                const querySnapshot = await getDocs(q);
                const dataRapih = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setOrders(dataRapih);
                console.log("Data Pesanan: ", dataRapih);
            } catch (error) {
                console.error("Gagal mengambil riwayat pesanan:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, [currentUser]);
    if (loading) return <div className="p-10 text-center">Sedang mengambil data...</div>
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Riwayat Pesanan Saya</h1>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
                {JSON.stringify(orders, null, 2)}
            </pre>
        </div>
    );
}