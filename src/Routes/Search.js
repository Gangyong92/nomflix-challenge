import React, { useState } from "react";
import styled from "styled-components";
import Loader from "Components/Loader";
import Section from "Components/Section";
import Message from "Components/Message";
import Poster from "Components/Poster";
import Helmet from "react-helmet";
import { movieApi, tvApi } from "api";

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`;

const Search = () => {
  const [state, setState] = useState({
    movieResult: null,
    tvResult: null,
    searchTerm: "",
    error: null,
    loading: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const { searchTerm } = state;
    if (searchTerm !== "") {
      searchByTerm();
    }
  };

  const updateTerm = (event) => {
    const {
      target: { value },
    } = event;
    setState((state) => ({ ...state, searchTerm: value }));
  };

  const searchByTerm = async () => {
    const { searchTerm } = state;
    setState((state) => ({ ...state, loading: true }));
    try {
      const {
        data: { results: movieResult },
      } = await movieApi.search(searchTerm);
      const {
        data: { results: tvResult },
      } = await tvApi.search(searchTerm);
      setState((state) => ({ ...state, movieResult, tvResult }));
    } catch {
      setState((state) => ({ ...state, error: "Can't find results." }));
    } finally {
      setState((state) => ({ ...state, loading: false }));
    }
  };

  const { movieResult, tvResult, searchTerm, error, loading } = state;

  return (
    <Container>
      <Helmet>
        <title>Search | Nomflix</title>
      </Helmet>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Search Movies or TV Shows..."
          value={searchTerm}
          onChange={updateTerm}
        />
      </Form>
      {loading ? (
        <Loader />
      ) : (
        <>
          {movieResult && movieResult.length > 0 && (
            <Section title="Movie Results">
              {movieResult.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={
                    movie.release_date && movie.release_date.substring(0, 4)
                  } // substring 문자열 자르기
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {tvResult && tvResult.length > 0 && (
            <Section title="TV Show Results">
              {tvResult.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.original_name}
                  rating={show.vote_average}
                  year={
                    show.first_air_date && show.first_air_date.substring(0, 4)
                  } // substring 문자열 자르기
                  isMovie={false}
                />
              ))}
            </Section>
          )}
          {error && <Message color="#e74c3c" text={error} />}
          {tvResult &&
            movieResult &&
            tvResult.length === 0 &&
            movieResult.length === 0 && (
              <Message color="#95a5a6" text="Nothing found" />
            )}
        </>
      )}
    </Container>
  );
};

export default Search;
