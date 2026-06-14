// Composant qui affiche les prévisions météo sur 5 jours
// Props : data (object) → les données de prévisions retournées par l'API
function ForecastCard({ data }) {
  // L'API forecast renvoie des prévisions toutes les 3h sur 5 jours
  // On filtre pour garder uniquement une prévision par jour à midi (12:00:00)
  const dailyForecasts = data.list.filter((item) =>
    item.dt_txt.includes("12:00:00"),
  );

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 w-full max-w-md mx-auto">
      {/* Titre */}
      <h3 className="text-white/60 text-xs text-center tracking-widest uppercase mb-4">
        Prévisions 5 jours
      </h3>

      {/* Grille des prévisions */}
      <div className="grid grid-cols-5 gap-2">
        {dailyForecasts.map((item) => (
          <div
            key={item.dt}
            className="bg-white/10 border border-white/10 rounded-2xl p-2 flex flex-col items-center gap-1"
          >
            {/* Jour de la semaine */}
            <p className="text-xs font-semibold text-white/60">
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
            <p className="text-sm font-bold text-white">
              {Math.round(item.main.temp)}°
            </p>

            {/* Température min */}
            <p className="text-xs text-white/40">
              {Math.round(item.main.temp_min)}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastCard;
