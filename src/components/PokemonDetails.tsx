import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface Pokemon {
  name: string;
  url: string;
}

interface Details {
  name: string;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
`;

const PokemonName = styled.h2`
  text-transform: uppercase;
  color: #303943;
`;

const PokemonImage = styled.img`
  width: 150px;
  height: 150px;
`;

const PokemonType = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`;

const TypeBadge = styled.span`
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${(props) => props.color || "#303943"};
  color: white;
  text-transform: uppercase;
`;

const PokemonStats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  justify-content: space-between;
`;

const StatBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: ${(props) => props.color || "#303943"};
`;

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const PokemonDetails: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  const [details, setDetails] = useState<Details | null>(null);

  useEffect(() => {
    fetch(pokemon.url)
      .then((response) => response.json())
      .then((data) => {
        setDetails(data);
      });
  }, [pokemon]);

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <DetailsContainer>
      <PokemonImage src={details.sprites.front_default} alt={details.name} />
      <PokemonName>{details.name}</PokemonName>
      <PokemonType>
        {details.types.map((type, index) => (
          <TypeBadge key={index} color={getColorForType(type.type.name)}>
            {type.type.name}
          </TypeBadge>
        ))}
      </PokemonType>
      <PokemonStats>
        {details.stats.map((stat, index) => (
          <StatBar
            key={index}
            style={{
              width: `${stat.base_stat}%`,
              backgroundColor: getColorForStat(stat.stat.name),
            }}
          >
            {capitalizeFirstLetter(stat.stat.name)}
          </StatBar>
        ))}
      </PokemonStats>
    </DetailsContainer>
  );
};
const typeColorMap: { [key: string]: string } = {
  grass: "#8ED752",
  poison: "#A040A1",
  fire: "#FE7E25",
  flying: "#A890F0",
  water: "#6890F0",
  bug: "#A8B820",
  electric: "#F8D030",
  ground: "#E0C068",
  fairy: "#EE99AC",
  fighting: "#C03028",
  psychic: "#F85888",
  rock: "#B8A038",
  steel: "#B8B8D0",
  ice: "#98D8D8",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
};

function getColorForType(type: string): string {
  return typeColorMap[type] || "#A8A878";
}

const statColorMap: { [key: string]: string } = {
  hp: "#FF0000",
  attack: "#F08030",
  defense: "#F8D030",
  speed: "#6890F0",
  "special-attack": "#78C850",
  "special-defense": "#F85888",
};

function getColorForStat(stat: string): string {
  return statColorMap[stat] || "#A8A878";
}

export default PokemonDetails;
