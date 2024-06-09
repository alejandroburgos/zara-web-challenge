import React from "react";
import { useLoading } from "../context/LoadingContext";

const LoadingBar = () => {
  const { progress } = useLoading();
  return (
    <div className="loading-bar">
      <div className="loading-bar__inner">
        <div
          className="loading-bar__progress"
          style={{ width: `${progress}%` }}
          data-testid="progress-bar"
        ></div>
      </div>
    </div>
  );
};

export default LoadingBar;
