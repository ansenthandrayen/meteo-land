import { render, screen } from "@testing-library/react";
import WeatherCard from "../components/WeatherCard";

// Données météo fictives qui simulent la réponse de l'API
const mockWeatherData = {
  name: "Paris",
  sys: { country: "FR" },
  main: {
    temp: 20,
    feels_like: 18,
    humidity: 65,
    pressure: 1013,
  },
  weather: [
    {
      description: "ciel dégagé",
      icon: "01d",
    },
  ],
  wind: { speed: 3.5 },
};

// Groupe de tests pour le composant WeatherCard
describe("WeatherCard", () => {
  // Test 1 → vérifie que le nom de la ville s'affiche
  it("affiche le nom de la ville", () => {
    render(<WeatherCard data={mockWeatherData} />);
    expect(screen.getByText("Paris")).toBeInTheDocument();
  });

  // Test 2 → vérifie que le code pays s'affiche
  it("affiche le code pays", () => {
    render(<WeatherCard data={mockWeatherData} />);
    expect(screen.getByText("FR")).toBeInTheDocument();
  });

  // Test 3 → vérifie que la température s'affiche arrondie
  it("affiche la température arrondie", () => {
    render(<WeatherCard data={mockWeatherData} />);
    // Math.round(20) = 20 → on cherche "20°"
    expect(screen.getByText("20°")).toBeInTheDocument();
  });

  // Test 4 → vérifie que la description météo s'affiche
  it("affiche la description météo", () => {
    render(<WeatherCard data={mockWeatherData} />);
    expect(screen.getByText(/ciel dégagé/i)).toBeInTheDocument();
  });

  // Test 5 → vérifie que l'humidité s'affiche
  it("affiche l humidité", () => {
    render(<WeatherCard data={mockWeatherData} />);
    expect(screen.getByText("65%")).toBeInTheDocument();
  });
});
