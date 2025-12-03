import { useEffect, useState } from "react";
import api from "../services/api";
import RequestCard from "../components/RequestCard";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const { token } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data);
    } catch (err) {
      alert("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await api.put(`/requests/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(prev => prev.map(r => r._id === id ? res.data : r));
    } catch (err) {
      alert("Failed to update status");
    }
  };

  useEffect(() => { fetchRequests(); }, []);

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === "pending").length,
    sent: requests.filter(r => r.status === "sent").length,
    completed: requests.filter(r => r.status === "completed").length,
    rejected: requests.filter(r => r.status === "rejected").length,
  };

  const statCards = [
    { label: "Total", value: stats.total, color: "from-purple-500 to-purple-600" },
    { label: "Pending", value: stats.pending, color: "from-yellow-500 to-amber-600" },
    { label: "sent", value: stats.sent, color: "from-green-500 to-emerald-600" },
    { label: "Completed", value: stats.completed, color: "from-blue-500 to-cyan-600" },
    { label: "Rejected", value: stats.rejected, color: "from-red-500 to-rose-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className={`bg-gradient-to-br ${stat.color} text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300`}
            >
              <h3 className="text-lg font-semibold opacity-90">{stat.label}</h3>
              <p className="text-4xl font-bold mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Requests List */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">All Requests</h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            </div>
          ) : requests.length === 0 ? (
            <p className="text-center text-gray-500 py-12 text-lg">No requests yet.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {requests.map((req) => (
                <RequestCard key={req._id} request={req} onUpdate={updateStatus} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}