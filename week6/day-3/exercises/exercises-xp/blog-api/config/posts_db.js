import knex from "knex";

const posts_db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "1234",
    database: "postgres",
  }
});

export default posts_db;
