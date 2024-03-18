CREATE TABLE treinadores (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE troca_pokemon (
    id SERIAL PRIMARY KEY,
    treinador_id REFERENCES treinadores(id),
    pokemon_nome VARCHAR(100) NOT NULL
);
