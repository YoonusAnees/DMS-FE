import { useState } from "react";
import Input from "../components/Input";
import api from "../services/api";

export default function RequestForm() {
  const [form, setForm] = useState({
    name: "", contact: "", location: "", itemNeeded: "", reason: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/requests", form);
      alert("Request submitted successfully!");
      setForm({ name: "", contact: "", location: "", itemNeeded: "", reason: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Request Disaster Relief</h1>
          <p className="text-gray-600">Fill in your details to receive help quickly</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <Input label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="Name" />
          <Input label="Phone / WhatsApp" name="contact" value={form.contact} onChange={handleChange} placeholder="0761231231" />
          <Input label="Location (City/Area)" name="location" value={form.location} onChange={handleChange} placeholder="Kandy, Akurana" />
          <Input label="Item Needed" name="itemNeeded" value={form.itemNeeded} onChange={handleChange} placeholder="Blankets, Food Packets, Water" />
          <Input label="Reason (Optional)" name="reason" value={form.reason} onChange={handleChange} placeholder="Flood-affected family of 5" />

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl shadow-lg transform transition hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting..." : "Submit Request"}
          </button>

          <p className="text-center text-xs text-gray-500 mt-6">
            Your request will be reviewed by our team within 24 hours.
          </p>
        </form>
      </div>
    </div>
  );
}