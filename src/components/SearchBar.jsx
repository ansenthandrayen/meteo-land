import { useState } from "react";

// Composant barre de recherche
// Props : onSearch (function) → fonction appelée quand l'utilisateur recherche une ville
function SearchBar({ onSearch }) {
  // useState stocke ce que l'utilisateur tape dans le champ
  const [city, setCity] = useState("");

  // Appelée quand l'utilisateur clique sur Rechercher ou appuie sur Entrée
  function handleSubmit(e) {
    e.preventDefault(); // Empêche le rechargement de la page

    // On n'envoie pas si le champ est vide
    if (city.trim() === "") return;

    onSearch(city); // On remonte la ville au composant parent
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 w-full max-w-md mx-auto"
    >
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Rechercher une ville..."
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Rechercher
      </button>
    </form>
  );
}

export default SearchBar;
