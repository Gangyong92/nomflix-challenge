import { useState, useEffect } from "react";
import { tvApi } from "../api";

const useTVs = () => {
  const [state, setState] = useState({
    topRated: null,
    popular: null,
    airingToday: null,
    error: null,
    loading: true,
  });

  const storeTVsToState = async () => {
    try {
      const {
        data: { results: topRated },
      } = await tvApi.topRated();
      const {
        data: { results: popular },
      } = await tvApi.popular();
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();

      setState((state) => ({
        ...state,
        topRated,
        popular,
        airingToday,
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
    storeTVsToState();
  }, []);

  return state;
};

export default useTVs;
