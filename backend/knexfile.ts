require("dotenv").config();

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "pokemon_db",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/migrations",
    },
  },
};
