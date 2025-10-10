import knex from "knex";

const register_login_db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "1234",
    database: "postgres",
  }
});

export default register_login_db;
