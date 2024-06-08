import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useParams } from "react-router-dom";
import { useMarvelApi } from "../../services/api";
import { FavoritesContext } from "../../context/FavoritesContext";
import CharacterDetailPage from "../../views/CharacterDetailPage";
import heartRed from "../../assets/icons/heart-red.svg";
import heartUnselected from "../../assets/icons/heart-unselected.svg";

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
}));

jest.mock("../../services/api", () => ({
  useMarvelApi: jest.fn(),
}));

jest.mock("../../components/ComicsCarrousel", () => () => (
  <div>Mocked ComicsCarrousel</div>
));

const mockAddFavorite = jest.fn();
const mockRemoveFavorite = jest.fn();
const mockIsFavorite = jest.fn();

const character = {
  id: 1,
  name: "Spider-Man",
  description: "Friendly neighborhood Spider-Man.",
  thumbnail: {
    path: "path/to/spiderman",
    extension: "jpg",
  },
};

describe("CharacterDetailPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useParams.mockReturnValue({ id: "1" });
    useMarvelApi.mockReturnValue({
      fetchCharacterDetails: jest.fn().mockResolvedValue(character),
    });
    mockIsFavorite.mockReturnValue(false);
  });

  const renderComponent = () =>
    render(
      <FavoritesContext.Provider
        value={{
          addFavorite: mockAddFavorite,
          removeFavorite: mockRemoveFavorite,
          isFavorite: mockIsFavorite,
        }}
      >
        <CharacterDetailPage />
      </FavoritesContext.Provider>
    );

  test("renders character details", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("Spider-Man")).toBeInTheDocument();
      expect(
        screen.getByText("Friendly neighborhood Spider-Man.")
      ).toBeInTheDocument();
      expect(screen.getByAltText("Spider-Man")).toHaveAttribute(
        "src",
        "path/to/spiderman.jpg"
      );
    });
  });

  test("renders ComicsCarrousel", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("Mocked ComicsCarrousel")).toBeInTheDocument();
    });
  });

  test("handles favorite toggle", async () => {
    mockIsFavorite.mockImplementation((id) => (id === 1 ? false : true));
    renderComponent();

    const favoriteButton = await screen.findByAltText("Favorite");

    fireEvent.click(favoriteButton);
    expect(mockAddFavorite).toHaveBeenCalledWith(character);
    expect(mockIsFavorite).toHaveBeenCalledWith(character.id);
    mockIsFavorite.mockImplementation((id) => (id === 1 ? true : false));

    fireEvent.click(favoriteButton);
    expect(mockRemoveFavorite).toHaveBeenCalledWith(character.id);
    expect(mockIsFavorite).toHaveBeenCalledWith(character.id);
  });

  test("displays correct favorite icon based on favorite status", async () => {
    mockIsFavorite.mockReturnValue(true);
    renderComponent();

    const favoriteButton = await screen.findByAltText("Favorite");

    expect(favoriteButton).toHaveAttribute("src", heartRed);
  });

  test("displays unselected favorite icon when not a favorite", async () => {
    mockIsFavorite.mockReturnValue(false);
    renderComponent();

    const favoriteButton = await screen.findByAltText("Favorite");

    expect(favoriteButton).toHaveAttribute("src", heartUnselected);
  });
});
