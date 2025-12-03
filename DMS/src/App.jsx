import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import RequestForm from "./pages/RequestForm";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";
import DashboardView from "./pages/DashboardView";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
                <Route path="/" element={<DashboardView />} />

        <Route path="/request" element={<RequestForm />} />

        <Route path="/register" element={<AdminRegister />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/adminDasboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
