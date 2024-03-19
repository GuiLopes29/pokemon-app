import React, { useEffect, useState } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import styled from "styled-components";

interface Pokemon {
  name: string;
  url: string;
}

interface Details {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}

const DetailsContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
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

const StatusContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

const StatusBar = styled.div`
  background-color: #ccc;
  border-radius: 25px;
  width: 200px; // Tamanho fixo da barra de status
  height: 20px;
  overflow: hidden;
`;

const StatusFill = styled.div<{ percentage: number; color: string }>`
  background-color: ${(props) => props.color};
  width: ${(props) =>
    (props.percentage / 100) *
    200}px; // Calcula a largura com base na porcentagem
  height: 100%;
`;

const PokeballWrapper = styled.div`
  position: absolute;
  z-index: 10;
  margin-bottom: 60px;
  margin-left: -10px;

  img {
    width: 30px;
    height: 30px;
    object-fit: contain;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
`;

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const statusNameMapping: { [key: string]: string } = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  speed: "SPD",
  "special-attack": "SP-ATK",
  "special-defense": "SP-DEF",
};

const PokemonDetails: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  const [details, setDetails] = useState<Details | null>(null);

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState<
    "success" | "error" | "info" | "warning" | undefined
  >("info");

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const catchPokemon = async () => {
    try {
      const response = await fetch("http://localhost:3000/capture/catch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          pokemonIndex: details?.id,
        }),
      });

      const data = await response.json();

      if (data.message === "Pokemon caught") {
        setMessage("Pokemon capturado! 🎉");
        setSeverity("success");
      } else {
        setMessage("Pokemon escapou! 😢");
        setSeverity("error");
      }
      setOpen(true);
    } catch (err) {
      console.error(err);
      setMessage(
        "Ocorreu um erro ao tentar capturar o Pokémon! Tente novamente mais tarde"
      );
      setSeverity("error");
      setOpen(true);
    }
  };
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
      <ImageContainer>
        <PokemonImage src={details.sprites.front_default} alt={details.name} />
        <PokeballWrapper onClick={catchPokemon}>
          <img src="/pokeball.svg" alt="Pokeball" />
        </PokeballWrapper>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      </ImageContainer>
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
          <StatusContainer key={index}>
            <div>
              <div>{statusNameMapping[stat.stat.name]}</div>
              <StatusBar>
                <StatusFill
                  percentage={stat.base_stat}
                  color={getColorForStat(stat.stat.name)}
                />
              </StatusBar>
            </div>
          </StatusContainer>
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
