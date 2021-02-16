import { useState, useEffect } from "react";
import { movieApi } from "../api";

const useMovies = () => {
  const [state, setState] = useState({
    nowPlaying: null,
    upcoming: null,
    popular: null,
    error: null,
    loading: true,
  });

  const storeMoviesToState = async () => {
    try {
      const {
        data: { results: nowPlaying },
      } = await movieApi.nowPlaying();
      const {
        data: { results: upcoming },
      } = await movieApi.upcoming();
      const {
        data: { results: popular },
      } = await movieApi.popular();

      setState((state) => ({
        ...state,
        nowPlaying,
        upcoming,
        popular,
      }));
    } catch {
      setState((state) => ({
        ...state,
        error: "Can't find movie informations.",
      }));
    } finally {
      setState((state) => ({
        ...state,
        loading: false,
      }));
    }
  };

  useEffect(() => {
    storeMoviesToState();
  }, []);

  return state;
};

export default useMovies;
