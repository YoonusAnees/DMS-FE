export default function Input({ label, type = "text", value, onChange, name, placeholder }) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   transition-all duration-200 shadow-sm hover:border-gray-400"
      />
    </div>
  );
}