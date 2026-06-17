import { useEffect, useRef, useState } from "react";
import { searchCities } from "../services/weatherApi";

// Composant barre de recherche avec suggestions
// Props : onSearch (function) → fonction appelée quand l'utilisateur choisit une ville
function SearchBar({ onSearch }) {
  // Ce que l'utilisateur tape dans le champ
  const [query, setQuery] = useState("");

  // Liste des villes suggérées par l'API Geocoding
  const [suggestions, setSuggestions] = useState([]);

  // Chargement des suggestions en cours
  const [loading, setLoading] = useState(false);

  // Indique si une recherche a été effectuée et n'a donné aucun résultat
  // Permet d'afficher "Aucune ville trouvée" uniquement quand pertinent
  const [noResults, setNoResults] = useState(false);

  // useRef pointe vers le conteneur de la SearchBar dans le DOM
  // Permet de détecter si un clic est à l'intérieur ou l'extérieur
  const containerRef = useRef(null);

  // useEffect écoute les clics sur toute la page
  // Si le clic est en dehors du conteneur → on ferme les suggestions
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setSuggestions([]);
        setNoResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Appelée à chaque frappe dans le champ
  // Lance une recherche de villes si l'utilisateur tape 3 caractères ou plus
  async function handleChange(e) {
    const value = e.target.value;
    setQuery(value);

    // On ne recherche pas si moins de 3 caractères
    if (value.trim().length < 3) {
      setSuggestions([]);
      setNoResults(false);
      return;
    }

    setLoading(true);
    setNoResults(false);

    try {
      const results = await searchCities(value);
      setSuggestions(results);

      // Si la recherche a réussi mais ne renvoie aucun résultat
      // → on l'indique à l'utilisateur
      if (results.length === 0) {
        setNoResults(true);
      }
    } catch (err) {
      console.error("Erreur lors de la recherche de villes:", err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }

  // Appelée quand l'utilisateur appuie sur une touche dans le champ
  function handleKeyDown(e) {
    if (e.key === "Enter" && suggestions.length > 0) {
      handleSelect(suggestions[0]);
    }
  }

  // Appelée quand l'utilisateur clique sur une ville dans la liste
  function handleSelect(city) {
    setQuery(`${city.name}, ${city.country}`);
    setSuggestions([]);
    setNoResults(false);
    onSearch(city);
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto">
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
          onKeyDown={handleKeyDown}
          placeholder="Rechercher une ville..."
          className="bg-transparent flex-1 text-white placeholder-white/40 focus:outline-none text-sm"
        />
        {loading && (
          <div className="w-4 h-4 border-2 border-white/40 border-t-transparent rounded-full animate-spin shrink-0"></div>
        )}
      </div>

      {/* Liste des suggestions → affichée uniquement si suggestions non vide */}
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

      {/* Message "Aucune ville trouvée" → affiché seulement si recherche terminée sans résultat */}
      {noResults && !loading && (
        <div className="absolute z-10 w-full mt-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3">
          <p className="text-white/60 text-sm text-center">
            Aucune ville trouvée pour « {query} »
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
