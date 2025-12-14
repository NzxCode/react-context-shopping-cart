import { useParams } from "react-router-dom";
export default function DetailPage() {
    const { id } = useParams();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Halaman Detail Produk</h1>
            <p className="text-xl mt-4">
                Kamu sedang melihat produk dengan ID : <span className="font-bold text-blue-600">{id}</span>
            </p>

            <p>Disini kita akan ambil data produk {id} dari database.</p>
        </div>
    )
}