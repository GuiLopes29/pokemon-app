import { Knex } from "knex";

exports.up = function (knex: Knex): Promise<void> {
  return knex.schema.createTable("treinadores", function (table) {
    table.increments();
    table.string("username").notNullable();
    table.string("password").notNullable();
  });
};

exports.down = function (knex: Knex): Promise<void> {
  return knex.schema.dropTable("treinadores");
};
