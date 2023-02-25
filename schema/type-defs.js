import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User]
    favouriteMovies: [Movie]
  }

  type Book {
    id: ID!
    name: String!
    yearOfPublication: Int!
  }

  input createUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = AMERICA
  }

  input updateUsernameInput {
    id: ID!
    newUsername: String!
  }

  type Mutation {
    createUser(input: createUserInput!): User
    updateUsername(input: updateUsernameInput!): User
  }

  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
    books: [Book!]!
  }

  enum Nationality {
    AFRICA
    AUSTRALIA
    AMERICA
  }
`;
