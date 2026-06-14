import { useState } from "react";

// On importe nos composants
import ErrorMessage from "./components/ErrorMessage";
import ForecastCard from "./components/ForecastCard";
import LoadingSpinner from "./components/LoadingSpinner";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

// On importe nos fonctions API
import {
  getCurrentWeatherByCoords,
  getForecastByCoords,
} from "./services/weatherApi";

// Retourne un dégradé CSS selon le code météo et l'icône
function getBackground(weatherData) {
  if (!weatherData) return "from-blue-800 via-blue-900 to-slate-900";

  const id = weatherData.weather[0].id;
  const icon = weatherData.weather[0].icon;

  // Nuit → détecté via la lettre "n" à la fin du code icône
  const isNight = icon.endsWith("n");
  if (isNight) return "from-indigo-950 via-blue-950 to-slate-900";

  // Orage
  if (id >= 200 && id < 300) return "from-gray-800 via-gray-900 to-slate-900";

  // Pluie / Bruine
  if (id >= 300 && id < 600) return "from-slate-600 via-slate-700 to-slate-900";

  // Neige
  if (id >= 600 && id < 700) return "from-blue-100 via-blue-200 to-slate-300";

  // Brouillard
  if (id >= 700 && id < 800) return "from-gray-400 via-gray-500 to-gray-700";

  // Ciel dégagé → soleil
  if (id === 800) return "from-amber-400 via-orange-400 to-blue-500";

  // Nuageux
  return "from-slate-400 via-slate-500 to-slate-700";
}

function App() {
  // Les 4 états de notre application
  const [weatherData, setWeatherData] = useState(null); // données météo actuelle
  const [forecastData, setForecastData] = useState(null); // données prévisions
  const [loading, setLoading] = useState(false); // chargement en cours ?
  const [error, setError] = useState(null); // message d'erreur

  // Appelée quand l'utilisateur recherche une ville
  async function handleSearch(city) {
    setLoading(true); // on affiche le spinner
    setError(null); // on efface l'erreur précédente
    setWeatherData(null);
    setForecastData(null);

    try {
      // On appelle les deux endpoints en parallèle
      const [weather, forecast] = await Promise.all([
        getCurrentWeatherByCoords(city.lat, city.lon),
        getForecastByCoords(city.lat, city.lon),
      ]);

      setWeatherData(weather);
      setForecastData(forecast);
    } catch (err) {
      setError(err.message); // on affiche l'erreur
    } finally {
      setLoading(false); // on cache le spinner dans tous les cas
    }
  }

  // Le dégradé change automatiquement selon la météo
  const background = getBackground(weatherData);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${background} transition-all duration-1000 p-6`}
    >
      {/* Titre */}
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        🌤️ Météo Land
      </h1>

      <p className="text-center text-white/60 text-sm mb-8">
        Recherchez n'importe quelle ville dans le monde
      </p>

      {/* Barre de recherche */}
      <SearchBar onSearch={handleSearch} />

      {/* Contenu dynamique selon l'état */}
      <div className="mt-8 flex flex-col items-center gap-6">
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {weatherData && <WeatherCard data={weatherData} />}
        {forecastData && <ForecastCard data={forecastData} />}
      </div>
    </div>
  );
}

export default App;
