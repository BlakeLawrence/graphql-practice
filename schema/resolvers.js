const { userList } = require("../schema/FakeData.js");

const resolvers = {
  Query: {
    users() {
      return userList;
    },
  },
};

module.exports = { resolvers };
