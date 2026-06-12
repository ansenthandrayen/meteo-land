// Composant qui affiche la météo actuelle d'une ville
// Props : data (object) → les données météo retournées par l'API
function WeatherCard({ data }) {
  // On extrait les données dont on a besoin depuis la réponse API
  const { name, main, weather, wind } = data;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mx-auto">
      {/* Ville et pays */}
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        {name}
      </h2>

      {/* Icône et température */}
      <div className="flex justify-center items-center gap-4 mb-4">
        <img
          src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt={weather[0].description}
        />
        <span className="text-6xl font-bold text-blue-500">
          {Math.round(main.temp)}°C
        </span>
      </div>

      {/* Description */}
      <p className="text-center text-gray-500 capitalize mb-6">
        {weather[0].description}
      </p>

      {/* Détails : ressenti, humidité, vent */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-blue-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1">Ressenti</p>
          <p className="font-semibold text-gray-700">
            {Math.round(main.feels_like)}°C
          </p>
        </div>
        <div className="bg-blue-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1">Humidité</p>
          <p className="font-semibold text-gray-700">{main.humidity}%</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1">Vent</p>
          <p className="font-semibold text-gray-700">
            {Math.round(wind.speed * 3.6)} km/h
          </p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
