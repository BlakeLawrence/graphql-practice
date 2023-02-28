import React from "react";
import { useQuery, gql } from "@apollo/client";

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

function DisplayData() {
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);

  if (loading) {
    // use laoding spinner in reality
    return <h1>Data is Loading</h1>;
  }

  if (data) {
    console.log(data);
  }

  if (error) {
    console.log(error);
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
    </div>
  );
}

export default DisplayData;
