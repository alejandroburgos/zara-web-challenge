import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../../components/SearchBar";

describe("SearchBar", () => {
  test("renders search input", () => {
    render(<SearchBar onSearch={() => {}} />);
    const searchInput = screen.getByPlaceholderText("Search a character...");
    expect(searchInput).toBeInTheDocument();
  });

  test("calls onSearch callback with the entered query", () => {
    const onSearchMock = jest.fn();
    render(<SearchBar onSearch={onSearchMock} />);
    const searchInput = screen.getByPlaceholderText("Search a character...");
    fireEvent.change(searchInput, { target: { value: "Iron Man" } });
    expect(onSearchMock).toHaveBeenCalledWith("Iron Man");
  });
});
