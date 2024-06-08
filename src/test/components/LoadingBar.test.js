import React from "react";
import { render, screen } from "@testing-library/react";
import LoadingBar from "../../components/LoadingBar";
import { useLoading } from "../../context/LoadingContext";

jest.mock("../../context/LoadingContext", () => ({
  useLoading: jest.fn(),
}));

describe("LoadingBar", () => {
  test("renders progress bar with correct width", () => {
    const progress = 50;
    useLoading.mockReturnValue({ progress });

    render(<LoadingBar />);

    const progressBar = screen.getByTestId("progress-bar");
    expect(progressBar).toHaveStyle({ width: "50%" });
  });

  test("renders progress bar with 0% width when progress is 0", () => {
    const progress = 0;
    useLoading.mockReturnValue({ progress });

    render(<LoadingBar />);

    const progressBar = screen.getByTestId("progress-bar");
    expect(progressBar).toHaveStyle({ width: "0%" });
  });

  test("renders progress bar with 100% width when progress is 100", () => {
    const progress = 100;
    useLoading.mockReturnValue({ progress });

    render(<LoadingBar />);

    const progressBar = screen.getByTestId("progress-bar");
    expect(progressBar).toHaveStyle({ width: "100%" });
  });
});
