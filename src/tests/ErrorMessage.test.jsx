import { render, screen } from "@testing-library/react";
import ErrorMessage from "../components/ErrorMessage";

// Groupe de tests pour le composant ErrorMessage
describe("ErrorMessage", () => {
  // Test 1 → vérifie que le message d'erreur s'affiche correctement
  it("affiche le message d erreur passé en prop", () => {
    // On rend le composant avec un message de test
    render(<ErrorMessage message="Ville introuvable" />);

    // On vérifie que le texte est bien présent dans le DOM
    expect(screen.getByText("Ville introuvable")).toBeInTheDocument();
  });

  // Test 2 → vérifie que le composant s'affiche bien avec un message vide
  it("s affiche sans erreur avec un message vide", () => {
    render(<ErrorMessage message="" />);

    // On vérifie que le composant est bien rendu sans planter
    const element = screen.getByRole("paragraph");
    expect(element).toBeInTheDocument();
  });
});
