import knex from "knex";

const book_db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "1234",
    database: "postgres",
  },
});

export default book_db;
