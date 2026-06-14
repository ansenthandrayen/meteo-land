// URL de base de l'API OpenWeatherMap
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// On récupère la clé API depuis les variables d'environnement
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// Fonction pour récupérer la météo actuelle d'une ville
export async function getCurrentWeather(city) {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`,
  );

  // Si la ville n'existe pas ou autre erreur → on lance une erreur
  if (!response.ok) {
    throw new Error("Ville introuvable");
  }

  return response.json();
}

// Fonction pour récupérer les prévisions sur 5 jours
export async function getForecast(city) {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=fr`,
  );

  if (!response.ok) {
    throw new Error("Ville introuvable");
  }

  return response.json();
}

// Fonction pour rechercher des villes correspondant à un terme
// Renvoie une liste de villes avec leur pays
export async function searchCities(query) {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Erreur lors de la recherche");
  }

  return response.json();
}
