import { Knex } from "knex";

exports.up = function (knex: Knex): Promise<void> {
  return knex.schema.createTable("pokemons_treinadores", function (table) {
    table.increments();
    table.string("pokemon_nome").notNullable();
    table.integer("treinador_id").notNullable();
    table.integer("index").notNullable();
    table.integer("quantity").notNullable();

    table.foreign("treinador_id").references("id").inTable("treinadores");
  });
};

exports.down = function (knex: Knex): Promise<void> {
  return knex.schema.dropTable("pokemons_treinadores");
};
