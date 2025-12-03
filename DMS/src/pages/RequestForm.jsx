import { useState } from "react";
import api from "../services/api";
import LocationSelect from "../components/LocationSelect";
import Input from "../components/Input";

export default function RequestForm() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    location: "",
    itemNeeded: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // basic validation
    if (!form.name || !form.contact || !form.location || !form.itemNeeded) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await api.post("/requests", form);
      alert("Request submitted!");
      setForm({ name: "", contact: "", location: "", itemNeeded: "", reason: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Request Relief Goods</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={"Your Name"}
          />
          <Input
            label="Contact Number"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder={"07*********"}

          />

          <span className="font-bold">Location</span>
          <LocationSelect
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Type or select your location"
          />
          <Input
            label="Item Needed"
            name="itemNeeded"
            value={form.itemNeeded}
            onChange={handleChange}
            placeholder={"Blanket,Dress....."}
          />
          <Input
            label="Reason (Add Quantities)"
            name="reason"
            value={form.reason}
            onChange={handleChange}
            placeholder={"Need 5 Blackets , 5 Family Need Dress ...."}

          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition transform hover:scale-105 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
}
