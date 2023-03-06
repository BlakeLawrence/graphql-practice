import React from "react";
import { useState } from "react";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
// Import comments:
// useQuery allows us to make queries to our GQL API - it works by fetching the data whenever our component renders

// useLazyQuery...

// gql is for gql statement, it is just for when we write a qgl statement (gql ` `) - like we learnt in the sandbox and how we wrote statements in the typeDefs (example of it in use below for QUERY_ALL_USERS)

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

const GET_MOVIE_BY_NAME = gql`
  query getMovieByName($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: createUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;

function DisplayData() {
  const [movieSearched, setMovieSearched] = useState("");

  // Create user States
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");

  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  if (loading) {
    // use laoding spinner
    return <h1>Data is Loading...</h1>;
  }

  if (error) {
    console.log(error);
  }

  return (
    <div>
      {/* creating a user using mutations  */}
      <div>
        <input
          type="text"
          placeholder="Name...."
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="User Name..."
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Nationality..."
          onChange={(e) => {
            setNationality(e.target.value.toUpperCase());
          }}
        />
        <button
          onClick={() => {
            createUser({
              variables: { input: { name, username, age: 21, nationality } },
            });
          }}
        >
          Create User
        </button>
      </div>
      {/* mapping over users to display user data */}
      {data &&
        data.users.map((user) => {
          return (
            <div>
              <h1>Name: {user.name}</h1>
              <h2>Username: {user.username}</h2>
              <h3>Age: {user.age}</h3>
              <h4>Nationality: {user.nationality}</h4>
              <br />
            </div>
          );
        })}
      {movieData &&
        movieData.movies.map((movie) => {
          return (
            <div>
              <h3>Name: {movie.name}</h3>
              <h4>Release Date: {movie.yearOfPublication}</h4>
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
