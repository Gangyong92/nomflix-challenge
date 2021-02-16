import React from "react";
import { Link, Route } from "react-router-dom";
import styled from "styled-components";
import Loader from "Components/Loader";
import Helmet from "react-helmet";
import useDetail from "../Hooks/useDetail";
import Videos from "Routes/Videos";
import Countries from "Routes/Countries";
import Companies from "Routes/Companies";
import Seasons from "Routes/Seasons";

const Container = styled.div`
  /* 50px은 header height임. 100vh에서 -50px 한 이유는 스크롤
  안뜨게 하게 위해서임. */
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  /* Container와 position 조합 한 이유는 Container 전체에 배경 넣기 위함 임.
  top, left, width, height도 마찬가지 */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  filter: blur(3px);
  opacity: 0.5;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  /* 이거 없으면 Cover에 Backdrop opacity 먹힘. Content가 Backdrop 안에 있는게
   아니고 같은 레벨에 있어서 그럼 absolute로 주면 Container 기준으로 움직여서 relative
  로 줌. position 안주고 하는 방법: Backdrop를 z-index: -1을 주거나 Content 안에 있는
  Cover에 z-index: 1을 주면 됨. */
  position: relative;
`;
const Cover = styled.div`
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  width: 30%;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;
const Item = styled.span`
  font-size: 16px;
`;
const Divider = styled.span`
  margin: 0 10px;
`;
const ExternalLink = styled.a`
  height: 40%;
  width: 40px;
`;
const BtnCover = styled.div`
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  height: 100%;
  width: 100%;
  border-radius: 4px;
  &:hover {
    opacity: 0.7;
    animation: heartbeat 0.7s linear infinite;
  }

  @keyframes heartbeat {
    0% {
      transform: rotateZ(0deg);
      width: 100%;
      height: 100%;
    }
    25% {
      transform: rotateZ(-10deg);
      width: 103%;
      height: 103%;
    }
    50% {
      transform: rotateZ(0deg);
      width: 100%;
      height: 100%;
    }
    75% {
      transform: rotateZ(10deg);
      width: 103%;
      height: 103%;
    }
    100% {
      transform: rotateZ(0deg);
      width: 100%;
      height: 100%;
    }
  }
`;
const Overview = styled.p`
  font-size: 16px;
  opacity: 0.8;
  line-height: 1.5;
  width: 50%;
`;

const LinkList = styled.div`
  margin: 20px 0;
  display: grid;
  grid-template-columns: 0.5fr repeat(2, 1fr) 0.5fr;
  width: 65%;
  gap: 10px;
`;
const SLink = styled(Link)``;
const TabTitle = styled.span`
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  border-radius: 3px;
  opacity: ${(props) => (props.current ? "0.9" : "0.8")};
  font-weight: ${(props) => (props.current ? "600" : "")};
  background-color: ${(props) =>
    props.current ? "rgba(178, 190, 195, 0.5)" : "rgba(178, 190, 195, 0.2)"};
  transition: background-color 0.3s ease-in-out;
  transition: opacity 0.3s ease-in-out;
  transition: font-weight 0.1s ease-in-out;
  &:hover {
    background-color: rgba(178, 190, 195, 0.4);
    opacity: 0.9;
    font-weight: 600;
  }
`;

const Detail = (props) => {
  const {
    location: { pathname },
    match: {
      params: { id },
    },
    history: { push },
  } = props;

  const isMovie = pathname.includes("/movie/");
  let contentKinds = "/movie/";
  if (isMovie !== true) {
    contentKinds = "/show/";
  }

  const { result, loading } = useDetail({ pathname, id, push });

  return loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={
          result.backdrop_path &&
          `https://image.tmdb.org/t/p/original${result.backdrop_path}`
        }
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../assets/noPosterSmall.png").default
          }
        />

        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>

            {result.imdb_id && (
              <>
                <Divider>•</Divider>
                <ExternalLink
                  target="_blank"
                  href={`https://imdb.com/title/${result.imdb_id}`}
                >
                  <BtnCover
                    bgImage={
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/220px-IMDB_Logo_2016.svg.png"
                    }
                  />
                </ExternalLink>
              </>
            )}
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <LinkList>
            <SLink to={`${contentKinds}${result.id}/videos`}>
              <TabTitle current={pathname.includes("/videos")}>Videos</TabTitle>
            </SLink>
            <SLink to={`${contentKinds}${result.id}/companies`}>
              <TabTitle current={pathname.includes("/companies")}>
                Production Companies
              </TabTitle>
            </SLink>
            <SLink to={`${contentKinds}${result.id}/countries`}>
              <TabTitle current={pathname.includes("/countries")}>
                Production Countries
              </TabTitle>
            </SLink>
            {isMovie !== true && (
              <SLink to={`/show/${result.id}/seasons`}>
                <TabTitle current={pathname.includes("/seasons")}>
                  Seasons
                </TabTitle>
              </SLink>
            )}
          </LinkList>
          <Route
            path={`${contentKinds}:id/videos`}
            component={(props) => (
              <Videos videos={result.videos.results} {...props} />
            )}
          />
          <Route
            path={`${contentKinds}:id/companies`}
            component={(props) => (
              <Companies companies={result.production_companies} {...props} />
            )}
          />
          <Route
            path={`${contentKinds}:id/countries`}
            component={(props) => (
              <Countries countries={result.production_countries} {...props} />
            )}
          />
          <Route
            path={`/show/:id/seasons`}
            component={(props) => (
              <Seasons seasons={result.seasons} {...props} />
            )}
          />
        </Data>
      </Content>
    </Container>
  );
};

export default Detail;
