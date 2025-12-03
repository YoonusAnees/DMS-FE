import { useState } from "react";
import Input from "../components/Input";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function AdminLogin() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { username, password });
      login(res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form className="w-96 bg-white p-6 rounded-xl shadow-xl" onSubmit={handleLogin}>
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

        <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg mt-4">
          Login
        </button>

        {/* <p className="text-center mt-3 text-sm">
          No account? <a href="/register" className="text-blue-600 underline">Register</a>
        </p> */}
      </form>
    </div>
  );
}
