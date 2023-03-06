import React from "react";
import { useState } from "react";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
// Import comments:
// useQuery allows us to make queries to our GQL API - it works by fetching the data whenever our component renders

// gql is for gql statement, it is just for when we write a qgl statement (gql ` `) - like we learnt in the sandbox and how we wrote statements in the typeDefs (example of it in use below for QUERY_ALL_USERS)

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
      nationality
      friends {
        name
        age
      }
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
const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

function DisplayData() {
  const [movieSearched, setMovieSearched] = useState("");

  // Create user states
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");

  // delete user state
  const [id, setId] = useState("");

  const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [deleteUser] = useMutation(DELETE_USER_MUTATION);

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
              variables: {
                input: { name, username, age: Number(age), nationality },
              },
            });
            refetch();
          }}
        >
          Create User
        </button>
        <input
          type="text"
          placeholder="User Id..."
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <button
          onClick={() => {
            deleteUser({
              variables: {
                id: Number(id),
              },
            });
            refetch();
          }}
        >
          Delete User
        </button>
      </div>
      {/* mapping over users to display user data */}
      {data &&
        data.users.map((user) => {
          console.log(data);
          return (
            <div className="mainDiv">
              <div className="nameDiv">
                <h4>Id: {user.id}</h4>
                <h1>Name: {user.name}</h1>
                <h2>Username: {user.username}</h2>
                <h3>Age: {user.age}</h3>
                <h4>Nationality: {user.nationality}</h4>
                <h4>
                  Friends:
                  {user.friends &&
                    user.friends.map((friend) => {
                      return (
                        <div>
                          <h3> name: {friend.name}</h3>
                          <h4> age: {friend.age}</h4>
                        </div>
                      );
                    })}
                </h4>
                <br />
              </div>
            </div>
          );
        })}
      {movieData &&
        movieData.movies.map((movie) => {
          return (
            <div className="mainMovieDiv">
              <div className="movies">
                <h3>Name: {movie.name}</h3>
                <h4>Release Date: {movie.yearOfPublication}</h4>
                <br />
              </div>
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
