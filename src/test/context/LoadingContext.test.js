import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { LoadingProvider, useLoading } from "../../context/LoadingContext";

describe("LoadingContext", () => {
  it("should set loading state to true", () => {
    const TestComponent = () => {
      const { loading, setLoading } = useLoading();

      const handleClick = () => {
        setLoading(true);
      };

      return (
        <div>
          <button onClick={handleClick}>Start Loading</button>
          {loading && <p>Loading...</p>}
        </div>
      );
    };

    const { getByText, queryByText } = render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>
    );

    fireEvent.click(getByText("Start Loading"));

    expect(queryByText("Loading...")).toBeInTheDocument();
  });

  it("should set loading state to false", () => {
    const TestComponent = () => {
      const { loading, setLoading } = useLoading();

      const handleClick = () => {
        setLoading(false);
      };

      return (
        <div>
          <button onClick={handleClick}>Stop Loading</button>
          {loading && <p>Loading...</p>}
        </div>
      );
    };

    const { getByText, queryByText } = render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>
    );

    fireEvent.click(getByText("Stop Loading"));

    expect(queryByText("Loading...")).not.toBeInTheDocument();
  });

  it("should update progress", () => {
    const TestComponent = () => {
      const { progress, setProgress } = useLoading();

      const handleClick = () => {
        setProgress(50);
      };

      return (
        <div>
          <button onClick={handleClick}>Update Progress</button>
          <p>Progress: {progress}%</p>
        </div>
      );
    };

    const { getByText } = render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>
    );

    fireEvent.click(getByText("Update Progress"));

    expect(getByText("Progress: 50%")).toBeInTheDocument();
  });
});
