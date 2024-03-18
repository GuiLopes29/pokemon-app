import { table } from "console";
import { Knex } from "knex";

exports.up = function (knex: Knex): Promise<void> {
  return knex.schema.createTable("troca_pokemon", function (table) {
    table.increments();
    table.integer("treinador_id").notNullable();
    table.integer("pokemon_id").notNullable();
    table.integer("treinador_id_troca").notNullable();
    table.integer("pokemon_id_troca").notNullable();

    table.foreign("treinador_id").references("id").inTable("treinadores");
    table
      .foreign("pokemon_id")
      .references("id")
      .inTable("pokemons_treinadores");

    table.foreign("treinador_id_troca").references("id").inTable("treinadores");
    table
      .foreign("pokemon_id_troca")
      .references("id")
      .inTable("pokemons_treinadores");
  });
};

exports.down = function (knex: Knex): Promise<void> {
  return knex.schema.dropTable("troca_pokemon");
};
