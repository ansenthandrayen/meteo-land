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
      <div className="flex items-center bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-5 py-3 gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-white/50 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Rechercher une ville..."
          className="bg-transparent flex-1 text-white placeholder-white/40 focus:outline-none text-sm"
        />
        {/* Spinner inline */}
        {loading && (
          <div className="w-4 h-4 border-2 border-white/40 border-t-transparent rounded-full animate-spin shrink-0"></div>
        )}
      </div>

      {/* Liste des suggestions */}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden">
          {suggestions.map((city, index) => (
            <li
              key={index}
              onClick={() => handleSelect(city)}
              className="px-5 py-3 hover:bg-white/15 cursor-pointer flex justify-between items-center transition-colors border-b border-white/10 last:border-none"
            >
              <span className="text-white text-sm font-medium">
                {city.name}
                {city.state ? `, ${city.state}` : ""}
              </span>
              <span className="text-white/40 text-xs">{city.country}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
