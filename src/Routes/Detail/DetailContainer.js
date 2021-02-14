import React from "react";
import DetailPresenter from "./DetailPresenter";
import { movieApi, tvApi } from "api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/"), // Movie인지 확인
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    /* isMovie만 있어도 되는 이유 movie, tv만 인식하고 나머지는 Route에 없기 때문에
    sdfsfs 이런 url은 home으로 redirect 될 거임. */
    const { isMovie } = this.state;
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
      this.setState({
        error: "Can't find anything.",
      });
    } finally {
      this.setState({ loading: false, result });
    }
  }

  render() {
    const { result, error, loading } = this.state;
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}
