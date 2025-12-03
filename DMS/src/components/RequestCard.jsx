export default function RequestCard({ request, onUpdate }) {
  const { name, contact, location, itemNeeded, reason, status, _id } = request;

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    sent: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    rejected: "bg-red-100 text-red-800",
  };

  const buttonsDisabled = status !== "pending";

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
      
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            statusColors[status] || "bg-gray-100"
          }`}
        >
          {status.toUpperCase()}
        </span>
      </div>

      <div className="space-y-2 text-gray-600">
        <p><strong>Item:</strong> {itemNeeded}</p>
        <p><strong>Contact:</strong> {contact}</p>
        <p><strong>Location:</strong> {location}</p>
        {reason && <p><strong>Reason:</strong> {reason}</p>}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {["sent", "completed", "rejected"].map((s) => (
          <button
            key={s}
            onClick={() => onUpdate(_id, s)}
            disabled={buttonsDisabled}
            className={`px-4 py-2 rounded-lg font-medium transition transform 
            ${
              buttonsDisabled
                ? "bg-gray-400 text-white cursor-not-allowed"
                : s === "sent"
                ? "bg-green-600 hover:bg-green-700 text-white"
                : s === "completed"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
