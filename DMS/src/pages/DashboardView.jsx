import { useEffect, useState } from "react";
import api from "../services/api";

export default function DashboardView() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

 

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await api.get("/requests");
      setRequests(res.data);
    } catch (err) {
      alert("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);


 

  // Stats calculation
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
    { label: "Sent", value: stats.sent, color: "from-green-500 to-emerald-600" },
    { label: "Completed", value: stats.completed, color: "from-blue-500 to-cyan-600" },
    { label: "Rejected", value: stats.rejected, color: "from-red-500 to-rose-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Dashboard Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">Relief Requests Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="text-center py-12 col-span-full">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            </div>
          ) : requests.length === 0 ? (
            <p className="text-center text-gray-500 py-12 text-lg col-span-full">No requests yet.</p>
          ) : (
            requests.map((req) => (
              <div
                key={req._id}
                className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-gray-800">{req.name}</p>
                  <p className="text-sm text-gray-600">{req.itemNeeded}</p>
                  {req.reason && <p className="text-xs text-gray-400">{req.reason}</p>}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    req.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : req.status === "sent"
                      ? "bg-green-100 text-green-800"
                      : req.status === "completed"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
