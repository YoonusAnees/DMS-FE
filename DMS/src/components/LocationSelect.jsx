import { useState, useEffect } from "react";
import locations from "../data/locations.json";

export default function LocationSelect({ value, onChange, name = "location", placeholder = "Select location" }) {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Show popular locations initially
    const popular = locations
      .filter(loc => 
        loc.type === "City" || 
        loc.type === "Commercial Capital" || 
        loc.type === "Administrative Capital"
      )
      .slice(0, 10);
    setFiltered(popular);
  }, []);

  const handleSearch = (e) => {
    const q = e.target.value;
    setSearch(q);
    
    if (!q) {
      // Show popular locations when empty
      const popular = locations
        .filter(loc => 
          loc.type === "City" || 
          loc.type === "Commercial Capital" || 
          loc.type === "Administrative Capital"
        )
        .slice(0, 10);
      setFiltered(popular);
    } else {
      const searchTerm = q.toLowerCase();
      const results = locations.filter(loc => 
        loc.name_en.toLowerCase().includes(searchTerm) ||
        (loc.name_si && loc.name_si.toLowerCase().includes(searchTerm)) ||
        (loc.name_ta && loc.name_ta.toLowerCase().includes(searchTerm)) ||
        loc.district.toLowerCase().includes(searchTerm) ||
        loc.province.toLowerCase().includes(searchTerm) ||
        loc.type.toLowerCase().includes(searchTerm)
      );
      setFiltered(results.slice(0, 25)); // Limit to 25 results
    }
    
    onChange({ target: { name, value: q } });
    setShowDropdown(true);
  };

  const handleSelect = (location) => {
    const displayText = `${location.name_en}${location.district ? `, ${location.district}` : ''}`;
    setSearch(displayText);
    setShowDropdown(false);
    onChange({ target: { name, value: displayText } });
    
    // Store selected location data for mapping
    localStorage.setItem('selectedLocation', JSON.stringify(location));
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 200);
  };

  const handleFocus = () => {
    if (!search) {
      const popular = locations
        .filter(loc => 
          loc.type === "City" || 
          loc.type === "Commercial Capital" || 
          loc.type === "Administrative Capital"
        )
        .slice(0, 10);
      setFiltered(popular);
    }
    setShowDropdown(true);
  };

  return (
    <div className="mb-4 relative w-full">
      <input
        type="text"
        name={name}
        value={search}
        placeholder={placeholder}
        onChange={handleSearch}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoComplete="off"
        className="w-full p-3 border rounded-lg bg-white border-gray-300
          focus:border-blue-600 focus:ring-2 focus:ring-blue-300 outline-none"
      />

      {showDropdown && filtered.length > 0 && (
        <ul className="absolute z-10 w-full max-h-96 overflow-y-auto bg-white border border-gray-200 rounded-md mt-1 shadow-lg">
          {filtered.map((location, index) => (
            <li
              key={`${location.name_en}-${location.district}-${index}`}
              onClick={() => handleSelect(location)}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
            >
              <div className="font-medium text-gray-900">{location.name_en}</div>
              <div className="text-sm text-gray-600 mt-1">
                {location.name_si && (
                  <span className="mr-3 font-sinhala">{location.name_si}</span>
                )}
                {location.name_ta && (
                  <span className="mr-3 font-tamil">{location.name_ta}</span>
                )}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                <span className="inline-block px-2 py-1 bg-gray-100 rounded mr-2">
                  {location.type}
                </span>
                <span className="mr-2">• {location.district}</span>
                <span>• {location.province}</span>
                {location.population && (
                  <span className="ml-2">• Pop: {location.population.toLocaleString()}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {search && filtered.length === 0 && (
        <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 p-4 text-gray-500">
          No locations found. Try a different search term.
        </div>
      )}
    </div>
  );
}