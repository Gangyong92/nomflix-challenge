import { useState, useEffect } from "react";
import { movieApi, tvApi } from "api";

const useDetail = ({ pathname, id, push }) => {
  const [state, setState] = useState({
    result: null,
    error: null,
    loading: true,
    isMovie: pathname.includes("/movie/"), // Movie인지 확인
  });

  const storeDetailToState = async () => {
    const { isMovie } = state;
    /* id 처리 */
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/"); // id가 NaN이면 홈으로 감.
    }
    let result = null;
    try {
      if (isMovie) {
        ({ data: result } = await movieApi.movieDetail(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
      }
    } catch {
      setState((state) => ({ ...state, error: "Can't find anything." }));
    } finally {
      setState((state) => ({ ...state, loading: false, result }));
    }
  };

  useEffect(() => {
    storeDetailToState();
  }, []);

  return state;
};

export default useDetail;
