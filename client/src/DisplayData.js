import React from "react";
import { useState } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`;
const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      name
      yearOfPublication
      isInTheaters
    }
  }
`;

const getMovieByName = gql`
  query getMovieByName($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

function DisplayData() {
  const [movieSearched, setMovieSearched] = useState("");
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(getMovieByName);

  if (loading) {
    // use laoding spinner
    return <h1>Data is Loading</h1>;
  }

  if (data) {
    console.log(data);
  }
  if (movieData) {
    console.log(movieData);
  }

  if (error) {
    console.log(error);
  }
  if (movieError) {
    console.log(movieError);
  }

  return (
    <div>
      {data &&
        data.users.map((user) => {
          return (
            <div>
              <div>Name: {user.name}</div>
              <div>Username: {user.username}</div>
              <div>Age: {user.age}</div>
              <div>Natioanlity: {user.nationality}</div>
              <br />
            </div>
          );
        })}
      {movieData &&
        movieData.movies.map((movie) => {
          return (
            <div>
              <div>Name: {movie.name}</div>
              <div>Release Date: {movie.yearOfPublication}</div>

              <br />
            </div>
          );
        })}

      <div>
        <input
          value={movieSearched}
          type="text"
          placeholder="Enter a movie..."
          onChange={(e) => {
            setMovieSearched(e.target.value);
          }}
        />
        <button
          onClick={() => {
            fetchMovie({
              variables: {
                name: movieSearched,
              },
            });
            setMovieSearched("");
          }}
        >
          Fetch Data
        </button>
        <div>
          {movieSearchedData && (
            <div>
              <h1>Movie Name: {movieSearchedData.movie.name}</h1>
              <h2>Release Date: {movieSearchedData.movie.yearOfPublication}</h2>
            </div>
          )}
          {movieError && <h1>This movie does not exist</h1>}
        </div>
      </div>
    </div>
  );
}

export default DisplayData;
