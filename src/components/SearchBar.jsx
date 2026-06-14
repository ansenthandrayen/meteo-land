import { useState } from "react";
import { searchCities } from "../services/weatherApi";

// Props : onSearch (function) → fonction appelée quand l'utilisateur choisit une ville
function SearchBar({ onSearch }) {
  const [query, setQuery] = useState(""); // ce que l'utilisateur tape
  const [suggestions, setSuggestions] = useState([]); // liste des villes trouvées
  const [loading, setLoading] = useState(false); // chargement des suggestions

  // Appelée à chaque frappe dans le champ
  async function handleChange(e) {
    const value = e.target.value;
    setQuery(value);

    // On ne recherche pas si moins de 3 caractères
    if (value.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const results = await searchCities(value);
      setSuggestions(results);
    } catch (err) {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }

  // Appelée quand l'utilisateur clique sur une ville
  function handleSelect(city) {
    // On met le nom de la ville dans le champ
    setQuery(`${city.name}, ${city.country}`);
    // On vide les suggestions
    setSuggestions([]);
    // On remonte la ville choisie au parent avec ses coordonnées
    onSearch(city);
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Champ de recherche */}
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Rechercher une ville..."
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-400 shadow-sm"
      />

      {/* Spinner de chargement */}
      {loading && (
        <div className="absolute right-4 top-3.5">
          <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Liste des suggestions */}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-xl shadow-lg mt-1 overflow-hidden">
          {suggestions.map((city, index) => (
            <li
              key={index}
              onClick={() => handleSelect(city)}
              className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex justify-between items-center"
            >
              {/* Nom de la ville et région */}
              <span className="font-medium text-gray-800">
                {city.name}
                {city.state ? `, ${city.state}` : ""}
              </span>
              {/* Code pays */}
              <span className="text-sm text-gray-400">{city.country}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
