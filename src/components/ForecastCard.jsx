// Composant qui affiche les prévisions météo sur 5 jours
// Props : data (object) → les données de prévisions retournées par l'API
function ForecastCard({ data }) {
  // L'API forecast renvoie des prévisions toutes les 3h sur 5 jours
  // On regroupe les entrées par jour pour calculer la vraie temp min/max
  const dailyForecasts = Object.values(
    data.list.reduce((acc, item) => {
      // On extrait la date sans l'heure ex: "2026-06-10"
      const date = item.dt_txt.split(" ")[0];

      if (!acc[date]) {
        // Première entrée du jour → on initialise avec ses valeurs
        acc[date] = {
          date,
          dt: item.dt,
          temp_max: item.main.temp_max,
          temp_min: item.main.temp_min,
          // On prend l'icône et la description de midi si disponible
          // sinon on prend la première entrée du jour
          icon: item.weather[0].icon,
          description: item.weather[0].description,
        };
      } else {
        // Entrées suivantes → on met à jour le min et le max
        acc[date].temp_max = Math.max(acc[date].temp_max, item.main.temp_max);
        acc[date].temp_min = Math.min(acc[date].temp_min, item.main.temp_min);

        // On préfère l'icône de midi (12:00:00) pour représenter la journée
        if (item.dt_txt.includes("12:00:00")) {
          acc[date].icon = item.weather[0].icon;
          acc[date].description = item.weather[0].description;
        }
      }

      return acc;
    }, {}),
  )
    // On garde uniquement 5 jours
    .slice(0, 5);

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 w-full max-w-md mx-auto">
      {/* Titre section */}
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
            {/* Jour de la semaine ex: lun, mar */}
            <p className="text-xs font-semibold text-white/60">
              {new Date(item.dt * 1000).toLocaleDateString("fr-FR", {
                weekday: "short",
              })}
            </p>

            {/* Icône météo représentative de la journée */}
            <img
              src={`https://openweathermap.org/img/wn/${item.icon}.png`}
              alt={item.description}
              className="w-10 h-10"
            />

            {/* Température maximale de la journée */}
            <p className="text-sm font-bold text-white">
              {Math.round(item.temp_max)}°
            </p>

            {/* Température minimale de la journée */}
            <p className="text-xs text-white/40">
              {Math.round(item.temp_min)}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastCard;
