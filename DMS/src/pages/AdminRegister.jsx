import { useState } from "react";
import Input from "../components/Input";
import api from "../services/api";

export default function AdminRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { username, password });
      alert("Admin Registered Successfully!");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form className="w-96 bg-white p-6 rounded-xl shadow-xl" onSubmit={handleRegister}>
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Register</h1>

        <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg mt-4">
          Register
        </button>

        <p className="text-center mt-3 text-sm">
          Already registered? <a href="/login" className="text-blue-600 underline">Login</a>
        </p>
      </form>
    </div>
  );
}
