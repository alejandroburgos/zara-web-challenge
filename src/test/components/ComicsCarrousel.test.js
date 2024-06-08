import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "@testing-library/react";
import { useMarvelApi } from "../../services/api";
import ComicsCarrousel from "../../components/ComicsCarrousel";

jest.mock("../../services/api");

describe("ComicsCarrousel", () => {
  const mockFetchComics = jest.fn();
  const mockComics = [
    {
      id: 1,
      title: "Comic 1",
      thumbnail: {
        path: "web/archive/image",
        extension: "jpg",
      },
      dates: [{ date: "2022-01-01" }],
    },
    {
      id: 2,
      title: "Comic 2",
      thumbnail: {
        path: "web/archive/image",
        extension: "jpg",
      },
      dates: [{ date: "2022-02-01" }],
    },
  ];

  beforeEach(() => {
    useMarvelApi.mockReturnValue({ fetchComics: mockFetchComics });
    mockFetchComics.mockResolvedValue(mockComics);
  });

  test("renders comics", async () => {
    await act(async () => {
      render(<ComicsCarrousel id={1} />);
    });

    const comicImages = await screen.findAllByRole("img");
    expect(comicImages).toHaveLength(2);

    const comicTitles = screen.getAllByText(/Comic \d/);
    expect(comicTitles).toHaveLength(2);

    const comicYears = screen.getAllByText(/2022/);
    expect(comicYears).toHaveLength(2);
  });

  test("calls fetchComics with correct id", async () => {
    await act(async () => {
      render(<ComicsCarrousel id={1} />);
    });

    expect(mockFetchComics).toHaveBeenCalledWith(1);
  });
});
