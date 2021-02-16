import { useState, useEffect } from "react";
import { tvApi } from "../api";

const useSeasons = (id, seasons) => {
  const [state, setState] = useState({
    results: [],
    error: null,
    loading: true,
  });

  const storeSeasonsToState = async () => {
    try {
      // Array, async/await 조합은 Promise.all로 추출해내고 필요한 데이터를 한번더 추출해야함
      const data = await Promise.all(
        seasons.map((season) => tvApi.seasons(id, season.season_number))
      );
      const seasonsData = data.map((season) => season.data);
      setState((state) => ({
        ...state,
        results: seasonsData,
      }));
    } catch {
      setState((state) => ({
        ...state,
        error: "Can't find season informations.",
      }));
    } finally {
      setState((state) => ({
        ...state,
        loading: false,
      }));
    }
  };

  useEffect(() => {
    storeSeasonsToState();
  }, []);

  return state;
};

export default useSeasons;
