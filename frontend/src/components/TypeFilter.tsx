import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface Type {
  name: string;
  url: string;
}

interface TypeFilterProps {
  onFilterChange: (selectedType: string) => void;
}

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #f3f3f3;
`;

const FilterSelect = styled.select`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const TypeFilter: React.FC<TypeFilterProps> = ({ onFilterChange }) => {
  const [types, setTypes] = useState<Type[]>([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/type")
      .then((response) => response.json())
      .then((data) => setTypes(data.results));
  }, []);

  return (
    <FilterContainer>
      <FilterSelect onChange={(e) => onFilterChange(e.target.value)}>
        <option value="">Todos</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name}
          </option>
        ))}
      </FilterSelect>
    </FilterContainer>
  );
};

export default TypeFilter;
