// Composant qui affiche la météo actuelle d'une ville
// Props : data (object) → les données météo retournées par l'API
function WeatherCard({ data }) {
  // On extrait les données dont on a besoin depuis la réponse API
  const { name, main, weather, wind, sys } = data;

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 w-full max-w-md mx-auto">
      {/* Ville et pays */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white">{name}</h2>
        <p className="text-white/50 text-sm mt-1">{sys.country}</p>
      </div>

      {/* Icône et température */}
      <div className="flex justify-center items-center gap-4 mb-2">
        <div className="bg-white/10 rounded-full p-3">
          <img
            src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
            alt={weather[0].description}
            className="w-16 h-16"
          />
        </div>
        <span className="text-7xl font-bold text-white">
          {Math.round(main.temp)}°
        </span>
      </div>

      {/* Description */}
      <p className="text-center text-white/70 capitalize text-sm mb-8">
        {weather[0].description} · Ressenti {Math.round(main.feels_like)}°C
      </p>

      {/* Détails : humidité, vent, pression */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/8 border border-white/10 rounded-2xl p-3 text-center">
          <p className="text-white/50 text-xs mb-1">Humidité</p>
          <p className="text-white font-semibold">{main.humidity}%</p>
        </div>
        <div className="bg-white/8 border border-white/10 rounded-2xl p-3 text-center">
          <p className="text-white/50 text-xs mb-1">Vent</p>
          <p className="text-white font-semibold">
            {Math.round(wind.speed * 3.6)} km/h
          </p>
        </div>
        <div className="bg-white/8 border border-white/10 rounded-2xl p-3 text-center">
          <p className="text-white/50 text-xs mb-1">Pression</p>
          <p className="text-white font-semibold">{main.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
