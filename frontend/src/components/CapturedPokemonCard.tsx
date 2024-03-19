import React, { useState } from "react";
import styled from "styled-components";
import PokemonDetails from "./PokemonDetails";

interface CapturedPokemon {
  name: string;
  index: number;
  quantity: number;
}

const Card = styled.div`
  width: 200px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 100%;
    height: auto;
  }

  h2 {
    font-size: 18px;
    margin: 10px 0;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  width: 80%;
  max-width: 400px;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: rotate(90deg);
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    width: 24px;
    background-color: #000;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

const CapturedPokemonCard: React.FC<{ pokemon: CapturedPokemon }> = ({
  pokemon,
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.index}.png`;

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Card onClick={handleOpenModal}>
        <img src={imageUrl} alt={pokemon.name} />
        <h2>{pokemon.name}</h2>
      </Card>
      {modalOpen && (
        <Modal onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <PokemonDetails pokemon={pokemon} showCapture={false} />
            <CloseButton onClick={handleCloseModal}></CloseButton>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default CapturedPokemonCard;
