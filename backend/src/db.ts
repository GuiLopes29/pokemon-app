import dotenv from "dotenv";
import knex from "knex";

dotenv.config();

const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "pokemon_db",
  },
});

export default db;
