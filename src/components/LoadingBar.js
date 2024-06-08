import React from "react";
import { useLoading } from "../context/LoadingContext";

const LoadingBar = () => {
  const { progress } = useLoading();
  return (
    <div className="progress-outer">
      <div className={`progress`}>
        <div
          className={`progress-bar`}
          style={{ width: `${progress}%` }}
          data-testid="progress-bar"
        ></div>
      </div>
    </div>
  );
};

export default LoadingBar;
