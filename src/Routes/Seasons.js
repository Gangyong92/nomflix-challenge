import styled from "styled-components";
import useSeasons from "Hooks/useSeasons";
import Message from "Components/Message";

const Container = styled.div``;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(max-content, 350px));
  gap: 30px;
`;
const PosterArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  height: 90%;
  opacity: 0.6;
  transition: opacity 0.2s ease-in-out;
`;
const CompanyName = styled.h3`
  text-align: center;
  font-size: 16px;
  transition: font-size 0.2s ease-in-out;
`;
const Cell = styled.div`
  width: 100%;
  height: 100%;
  &:hover {
    height: 102%;
    ${PosterArea} {
      opacity: 1;
    }
    ${CompanyName} {
      font-size: 20px;
      color: rgba(0, 255, 255, 1);
      font-weight: 600;
    }
  }
`;
const Poster = styled.img``;

const Seasons = (props) => {
  const {
    seasons,
    match: {
      params: { id },
    },
  } = props;

  const { results } = useSeasons(id, seasons);

  return (
    <Container>
      {results && results.length > 0 ? (
        <Grid>
          {results.map((result, index) => (
            <Cell key={index}>
              <PosterArea>
                <Poster
                  src={
                    result.poster_path
                      ? `https://image.tmdb.org/t/p/w300${result.poster_path}`
                      : require("../assets/noPosterSmall.png").default
                  }
                />
              </PosterArea>
              <CompanyName>{result.name}</CompanyName>
            </Cell>
          ))}
        </Grid>
      ) : (
        <Message color="#e74c3c" text="Seasons do not exist" />
      )}
    </Container>
  );
};

export default Seasons;
