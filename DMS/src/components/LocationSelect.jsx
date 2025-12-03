import { useState, useEffect } from "react";
import locations from "../data/locations.json";

export default function LocationSelect({ value, onChange, name = "location", placeholder = "Select location" }) {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(locations.map(l => l.name_en));

  useEffect(() => {
    // initialize filtered list
    setFiltered(locations.map(l => l.name_en));
  }, []);

  const handleSearch = (e) => {
    const q = e.target.value;
    setSearch(q);

    if (!q) {
      setFiltered(locations.map(l => l.name_en));
    } else {
      setFiltered(
        locations
          .map(l => l.name_en)
          .filter(o => o.toLowerCase().includes(q.toLowerCase()))
      );
    }

    onChange({ target: { name, value: q } });
  };

  const handleSelect = (o) => {
    setSearch(o);
    onChange({ target: { name, value: o } });
    setFiltered(locations.map(l => l.name_en)); // reset after select if you want
  };

  return (
    <div className="mb-4 relative w-full">
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleSearch}
        autoComplete="off"
        className="w-full p-3 border rounded-lg bg-white border-gray-300
          focus:border-blue-600 focus:ring-2 focus:ring-blue-300 outline-none"
      />
      {search && filtered.length > 0 && (
        <ul className="absolute z-10 w-full max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-md mt-1 shadow-lg">
          {filtered.map((o) => (
            <li
              key={o}
              onClick={() => handleSelect(o)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {o}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
