import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MenuButton = styled.button`
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;

const TopMenu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        backgroundColor: "#f8f8f8",
      }}
    >
      <MenuButton onClick={() => navigate("/")}>Página Inicial</MenuButton>
      <MenuButton onClick={() => navigate("/pokedex")}>Pokedex</MenuButton>
      <MenuButton onClick={handleLogout}>Sair</MenuButton>
    </div>
  );
};

export default TopMenu;
