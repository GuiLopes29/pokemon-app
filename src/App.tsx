import React, { useState } from "react";
import TypeFilter from "./components/TypeFilter";
import PokemonList from "./components/PokemonList";

const App: React.FC = () => {
  const [filter, setFilter] = useState<string>("");

  const handleFilterChange = (selectedType: string) => {
    setFilter(selectedType);
  };

  return (
    <div>
      <TypeFilter onFilterChange={handleFilterChange} />
      <PokemonList filter={filter} />
    </div>
  );
};

export default App;
