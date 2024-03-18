import { useState, forwardRef } from "react";
import styled from "styled-components";
import PokemonDetails from "./PokemonDetails";
import Pokeball from "./Pokeball";

interface Pokemon {
  name: string;
  url: string;
}

const PokeballWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 99999;
`;

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

const PokemonCard = forwardRef<HTMLDivElement, { pokemon: Pokemon }>(
  ({ pokemon }, ref) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const pokemonIndex =
      pokemon.url.split("/")[pokemon.url.split("/").length - 2];
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;

    const handleOpenModal = () => {
      setModalOpen(true);
    };

    const handleCloseModal = () => {
      setModalOpen(false);
    };

    return (
      <>
        <Card ref={ref} onClick={handleOpenModal}>
          <PokeballWrapper>
            <Pokeball /> {/* Adicione o componente Pokeball */}
          </PokeballWrapper>
          <img src={imageUrl} alt={pokemon.name} />
          <h2>{pokemon.name}</h2>
        </Card>
        {modalOpen && (
          <Modal onClick={handleCloseModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <PokemonDetails pokemon={pokemon} />
              <CloseButton onClick={handleCloseModal}></CloseButton>
            </ModalContent>
          </Modal>
        )}
      </>
    );
  }
);

export default PokemonCard;
