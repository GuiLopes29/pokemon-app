import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TypeFilter from "./components/TypeFilter";
import PokemonList from "./components/PokemonList";
import Login from "./components/Login"; // Certifique-se de importar o componente Login

const App: React.FC = () => {
  const [filter, setFilter] = useState<string>("");

  const handleFilterChange = (selectedType: string) => {
    setFilter(selectedType);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <div>
              <TypeFilter onFilterChange={handleFilterChange} />
              <PokemonList filter={filter} />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
