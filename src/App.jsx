import { useState } from "react";

// On importe nos composants
import ErrorMessage from "./components/ErrorMessage";
import ForecastCard from "./components/ForecastCard";
import LoadingSpinner from "./components/LoadingSpinner";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

// On importe nos fonctions API
import { getCurrentWeather, getForecast } from "./services/weatherApi";

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
        getCurrentWeather(city),
        getForecast(city),
      ]);

      setWeatherData(weather);
      setForecastData(forecast);
    } catch (err) {
      setError(err.message); // on affiche l'erreur
    } finally {
      setLoading(false); // on cache le spinner dans tous les cas
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-6">
      {/* Titre */}
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        🌤️ Météo Land
      </h1>

      {/* Barre de recherche */}
      <SearchBar onSearch={handleSearch} />

      {/* Contenu dynamique selon l'état */}
      <div className="mt-8">
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {weatherData && <WeatherCard data={weatherData} />}
        {forecastData && <ForecastCard data={forecastData} />}
      </div>
    </div>
  );
}

export default App;
