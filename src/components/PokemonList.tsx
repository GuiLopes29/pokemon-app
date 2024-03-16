import React, { useEffect, useState, useRef, useCallback } from "react";
import PokemonCard from "./PokemonCard";
import styled from "styled-components";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonListProps {
  filter: string;
}

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const PokemonList: React.FC<PokemonListProps> = ({ filter }) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const observer = useRef<IntersectionObserver>();
  const lastPokemonRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextUrl) {
          fetch(nextUrl)
            .then((response) => response.json())
            .then((data) => {
              if (filter && data.pokemon) {
                setPokemonList((prevPokemonList) => [
                  ...prevPokemonList,
                  ...data.pokemon.map((p: any) => p.pokemon),
                ]);
              } else if (data.results) {
                setPokemonList((prevPokemonList) => [
                  ...prevPokemonList,
                  ...data.results,
                ]);
              }
              if (data.next) {
                setNextUrl(data.next);
              }
            });
        }
      });
      if (node) observer.current.observe(node);
    },
    [nextUrl, filter]
  );

  useEffect(() => {
    fetch(
      filter
        ? `https://pokeapi.co/api/v2/type/${filter}`
        : "https://pokeapi.co/api/v2/pokemon"
    )
      .then((response) => response.json())
      .then((data) => {
        if (filter && data.pokemon) {
          setPokemonList(data.pokemon.map((p: any) => p.pokemon));
        } else if (data.results) {
          setPokemonList(data.results);
        }
        if (data.next) {
          setNextUrl(data.next);
        }
      });
  }, [filter]);

  return (
    <List>
      {pokemonList &&
        pokemonList.map((pokemon, index) => {
          if (pokemonList.length === index + 1) {
            return (
              <PokemonCard
                ref={lastPokemonRef}
                key={pokemon.name}
                pokemon={pokemon}
              />
            );
          } else {
            return <PokemonCard key={pokemon.name} pokemon={pokemon} />;
          }
        })}
      {!nextUrl && <div>You've reached the end of the list!</div>}
    </List>
  );
};

export default PokemonList;
