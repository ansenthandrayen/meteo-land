import { render } from "@testing-library/react";
import LoadingSpinner from "../components/LoadingSpinner";

// Groupe de tests pour le composant LoadingSpinner
describe("LoadingSpinner", () => {
  // Test 1 → vérifie que le spinner s'affiche bien dans le DOM
  it("s affiche correctement", () => {
    // On rend le composant
    const { container } = render(<LoadingSpinner />);

    // On vérifie que le div principal est bien rendu
    expect(container.firstChild).toBeInTheDocument();
  });

  // Test 2 → vérifie que le spinner contient l'animation
  it("contient la classe d animation spin", () => {
    const { container } = render(<LoadingSpinner />);

    // On cherche l'élément avec la classe animate-spin
    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });
});
