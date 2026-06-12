// Composant qui affiche les prévisions météo sur 5 jours
// Props : data (object) → les données de prévisions retournées par l'API
function ForecastCard({ data }) {
  // L'API forecast renvoie des prévisions toutes les 3h sur 5 jours
  // On filtre pour garder uniquement une prévision par jour à midi (12:00:00)
  const dailyForecasts = data.list.filter((item) =>
    item.dt_txt.includes("12:00:00"),
  );

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">
        Prévisions 5 jours
      </h3>

      <div className="grid grid-cols-5 gap-2">
        {dailyForecasts.map((item) => (
          <div
            key={item.dt}
            className="bg-white rounded-xl shadow p-2 flex flex-col items-center gap-1"
          >
            {/* Jour de la semaine */}
            <p className="text-xs font-semibold text-gray-600">
              {new Date(item.dt * 1000).toLocaleDateString("fr-FR", {
                weekday: "short",
              })}
            </p>

            {/* Icône météo */}
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].description}
              className="w-10 h-10"
            />

            {/* Température */}
            <p className="text-sm font-bold text-blue-500">
              {Math.round(item.main.temp)}°C
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastCard;
