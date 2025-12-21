import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import { Routes, Route } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product/:id" element={<DetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/cart"
          element= {
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
          <Route 
             path="/checkout"
             element= {
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
             }
        />
      </Routes>
    </div>
  );
}
export default App