import React, { useEffect, useState } from "react";
import { useLoading } from "../context/LoadingContext";

const AlertError = ({ message }) => {
  const { setError, setLoading } = useLoading();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        setError(null);
        setLoading(false);
      }, 500);
    }, 5000);

    return () => clearTimeout(timer);
  }, [setError, setLoading]);
  return (
    <div className={`alert-error ${visible ? "alert-error--visible" : ""}`}>
      <p className="alert-error__message">{message}</p>
      <button
        className="alert-error__button"
        onClick={() => {
          setError(null);
          setLoading(false);
        }}
      >
        Close
      </button>
    </div>
  );
};

export default AlertError;
