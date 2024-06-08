import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { FavoritesContext } from "../../context/FavoritesContext";
import CharacterCard from "../../components/CharacterCard";

import "@testing-library/jest-dom/extend-expect";

describe("CharacterCard", () => {
  const character = {
    id: 1,
    name: "Iron Man",
    thumbnail: {
      path: "path/to/image",
      extension: "jpg",
    },
  };

  test("renders character name", () => {
    const isFavorite = jest.fn().mockReturnValue(false);

    render(
      <BrowserRouter>
        <FavoritesContext.Provider value={{ isFavorite }}>
          <CharacterCard character={character} />
        </FavoritesContext.Provider>
      </BrowserRouter>
    );

    const characterName = screen.getByText("Iron Man");
    expect(characterName).toBeInTheDocument();
  });
});
