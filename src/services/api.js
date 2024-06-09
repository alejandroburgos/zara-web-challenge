import { useCallback } from "react";
import axios from "axios";
import md5 from "md5";
import { useLoading } from "../context/LoadingContext";

const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_API;
const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_API;
const baseURL = "http://gateway.marvel.com/v1/public";

const getAuthParams = () => {
  const ts = new Date().getTime().toString();
  const hash = md5(ts + privateKey + publicKey);
  return {
    ts,
    apikey: publicKey,
    hash,
  };
};

export const useMarvelApi = () => {
  const { setLoading, setProgress, setError } = useLoading(); // Agregar setError

  const simulateProgress = useCallback(
    (duration = 1000) => {
      let progress = 0;
      const increment = 100 / (duration / 100);

      return new Promise((resolve) => {
        const interval = setInterval(() => {
          progress += increment;
          if (progress >= 100) {
            setProgress(100);
            clearInterval(interval);
            resolve();
          } else {
            setProgress(progress);
          }
        }, 100);
      });
    },
    [setProgress]
  );

  const fetchCharacters = useCallback(
    async (limit = 50) => {
      setProgress(0);
      setLoading(true);
      setError(null);

      const params = {
        ...getAuthParams(),
        limit,
      };

      try {
        const response = await axios.get(`${baseURL}/characters`, {
          params,
        });
        await simulateProgress();
        setLoading(false);
        return response.data.data.results;
      } catch (error) {
        setLoading(false);
        setError("Error fetching characters || " + error.response.data.message);
        console.error("Error fetching characters:", error);
        return [];
      }
    },
    [setLoading, setProgress, simulateProgress, setError]
  );

  const fetchCharacterDetails = useCallback(
    async (id) => {
      setLoading(true);
      setProgress(0);
      setError(null);

      const params = getAuthParams();

      try {
        const response = await axios.get(`${baseURL}/characters/${id}`, {
          params,
        });
        await simulateProgress();
        setLoading(false);
        return response.data.data.results[0];
      } catch (error) {
        setLoading(false);
        setError(
          "Error fetching character details ||" + error.response.data.message
        );
        console.error("Error fetching character details:", error);
        return null;
      }
    },
    [setLoading, setProgress, simulateProgress, setError]
  );

  const fetchComics = useCallback(
    async (id) => {
      setLoading(true);
      setProgress(0);
      setError(null);

      const params = getAuthParams();

      try {
        const response = await axios.get(`${baseURL}/characters/${id}/comics`, {
          params,
        });
        await simulateProgress();
        setLoading(false);
        return response.data.data.results;
      } catch (error) {
        setLoading(false);
        setError("Error fetching comics" + error.response.data.message);
        console.error("Error fetching comics:", error);
        return [];
      }
    },
    [setLoading, setProgress, simulateProgress, setError]
  );

  return { fetchCharacters, fetchCharacterDetails, fetchComics };
};
