import { useEffect, useState } from "react";
import CapturedPokemonCard from "./CapturedPokemonCard";

interface CapturedPokemon {
  index: number;
  quantity: number;
}

interface DetailedPokemon {
  name: string;
  quantity: number;
  index: number;
}

const PersonalPokedex = () => {
  const [capturedPokemons, setCapturedPokemons] = useState<DetailedPokemon[]>(
    []
  );

  useEffect(() => {
    fetch("http://localhost:3000/pokemon", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        Promise.all(
          data.map((pokemon: CapturedPokemon) =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.index}`)
              .then((response) => response.json())
              .then((details) => ({
                name: details.name,
                count: pokemon.quantity,
                index: pokemon.index,
              }))
          )
        ).then((detailedPokemons) => {
          console.log(detailedPokemons);
          const allPokemons = detailedPokemons.flatMap((pokemon) =>
            Array(pokemon.count).fill(pokemon)
          );
          setCapturedPokemons(allPokemons);
        });
      });
  }, []);

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {capturedPokemons.length > 0 ? (
        capturedPokemons.map((pokemon: DetailedPokemon, index: number) => (
          <CapturedPokemonCard key={index} pokemon={pokemon} />
        ))
      ) : (
        <p>Você ainda não capturou nenhum Pokemon.</p>
      )}
    </div>
  );
};

export default PersonalPokedex;
