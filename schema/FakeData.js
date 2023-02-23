const userList = [
  {
    id: 1,
    name: "Blake",
    username: "blake",
    age: 29,
    nationality: "AFRICA",
    friends: [
      {
        id: 2,
        name: "Helen",
        username: "Macks",
        age: 39,
        nationality: "AFRICA",
      },
      {
        id: 3,
        name: "Justin",
        username: "juzzy",
        age: 27,
        nationality: "AMERICA",
      },
    ],
  },
  {
    id: 2,
    name: "Helen",
    username: "Macks",
    age: 39,
    nationality: "AFRICA",
  },
  {
    id: 3,
    name: "Justin",
    username: "juzzy",
    age: 27,
    nationality: "AMERICA",
  },
  {
    id: 4,
    name: "Ed",
    username: "eddy123",
    age: 40,
    nationality: "AUSTRALIA",
    friends: [
      {
        id: 3,
        name: "Justin",
        username: "juzzy",
        age: 27,
        nationality: "AMERICA",
      },
    ],
  },
];

module.exports = { userList };
