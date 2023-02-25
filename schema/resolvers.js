import { userList, movieList, bookList } from "../schema/FakeData.js";
import _ from "lodash";

export const resolvers = {
  Query: {
    // User Resolvers
    users: () => {
      return userList;
    },
    user: (parent, args) => {
      const id = args.id;
      const user = _.find(userList, { id: Number(id) });
      return user;
    },

    // Movie Resolvers
    movies: () => {
      return movieList;
    },
    movie: (parent, args) => {
      const name = args.name;
      const movie = _.find(movieList, { name });
      return movie;
    },

    // Book Resolvers
    books: () => {
      return bookList;
    },
  },

  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = userList[userList.length - 1].id;
      user.id = lastId + 1;
      userList.push(user);
      return user;
    },
  },

  User: {
    favouriteMovies: () => {
      return _.filter(movieList, (movie) => movie.yearOfPublication > 2016);
    },
  },
};
