import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import DistributorDashboard from "./pages/DistributorDashboard";
import BookingPage from "./pages/BookingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/customer" element={<CustomerDashboard />} />
      <Route path="/distributor" element={<DistributorDashboard />} />
      <Route path="/book" element={<BookingPage />} />
    </Routes>
  );
}

export default App;