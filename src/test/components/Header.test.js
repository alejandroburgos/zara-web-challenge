import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { FavoritesContext } from "../../context/FavoritesContext";
import { useLoading } from "../../context/LoadingContext";
import Header from "../../components/Header";
import logo from "../../assets/images/marvel-logo.svg";

jest.mock("../../context/LoadingContext");

describe("Header", () => {
  test("renders logo", () => {
    useLoading.mockReturnValue({ loading: false });
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const logoElement = screen.getByAltText("Marvel Logo");
    expect(logoElement).toBeInTheDocument();
    expect(logoElement.src).toContain(logo);
  });

  test("renders favorites count", () => {
    const favorites = [{ id: 1, name: "Iron Man" }];
    const isFavorite = jest.fn().mockReturnValue(true);

    useLoading.mockReturnValue({ loading: false });

    render(
      <BrowserRouter>
        <FavoritesContext.Provider value={{ favorites, isFavorite }}>
          <Header />
        </FavoritesContext.Provider>
      </BrowserRouter>
    );

    const favoritesCount = screen.getByText("1");
    expect(favoritesCount).toBeInTheDocument();
  });
});
