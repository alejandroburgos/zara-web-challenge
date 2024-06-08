import React, { useContext } from "react";
import { render, act } from "@testing-library/react";
import {
  FavoritesContext,
  FavoritesProvider,
} from "../../context/FavoritesContext";

const TestComponent = () => {
  const { favorites, addFavorite, removeFavorite, isFavorite } =
    useContext(FavoritesContext);

  return (
    <div>
      <button onClick={() => addFavorite({ id: 1, name: "Character 1" })}>
        Add Favorite
      </button>
      <button onClick={() => removeFavorite(1)}>Remove Favorite</button>
      <div data-testid="favorites-count">{favorites.length}</div>
      <div data-testid="is-favorite">{isFavorite(1) ? "Yes" : "No"}</div>
    </div>
  );
};

describe("FavoritesContext", () => {
  test("adds a favorite", () => {
    const { getByText, getByTestId } = render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    act(() => {
      getByText("Add Favorite").click();
    });

    expect(getByTestId("favorites-count").textContent).toBe("1");
    expect(getByTestId("is-favorite").textContent).toBe("Yes");
  });

  test("removes a favorite", () => {
    const { getByText, getByTestId } = render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    act(() => {
      getByText("Add Favorite").click();
    });

    act(() => {
      getByText("Remove Favorite").click();
    });

    expect(getByTestId("favorites-count").textContent).toBe("0");
    expect(getByTestId("is-favorite").textContent).toBe("No");
  });

  test("checks if a character is a favorite", () => {
    const { getByText, getByTestId } = render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    act(() => {
      getByText("Add Favorite").click();
    });

    expect(getByTestId("is-favorite").textContent).toBe("Yes");
  });
});
