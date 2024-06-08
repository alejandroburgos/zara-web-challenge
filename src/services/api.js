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

// NOTA: LAS LLAMADAS DE MARVEL NO TRAE EL VALOR DEL PROGRESS, POR ESO MISMO VOY A SIMULARLO PARA RESPETAR EL FIGMA
export const useMarvelApi = () => {
  const { setLoading, setProgress } = useLoading();

  const simulateProgress = (duration = 1000) => {
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
  };

  const fetchCharacters = async (query = "", limit = 50) => {
    setProgress(0);
    setLoading(true);

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
      console.error("Error fetching characters:", error);
      return [];
    }
  };

  const fetchCharacterDetails = async (id) => {
    setLoading(true);
    setProgress(0);

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
      console.error("Error fetching character details:", error);
      return null;
    }
  };

  const fetchComics = async (id) => {
    setLoading(true);
    setProgress(0);

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
      console.error("Error fetching comics:", error);
      return [];
    }
  };

  return { fetchCharacters, fetchCharacterDetails, fetchComics };
};
