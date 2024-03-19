import React from "react";
import { Link } from "react-router-dom";

const PokedexButton = () => {
  return (
    <Link to="/minha-pokedex">
      <button type="button">Minha Pokedex</button>
    </Link>
  );
};

export default PokedexButton;
