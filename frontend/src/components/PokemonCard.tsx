import { useState, forwardRef } from "react";
import styled from "styled-components";
import PokemonDetails from "./PokemonDetails";

interface Pokemon {
  name: string;
  url: string;
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
  position: absolute;
  top: 10px;
  right: 10px;
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
          <img src={imageUrl} alt={pokemon.name} />
          <h2>{pokemon.name}</h2>
        </Card>
        {modalOpen && (
          <Modal onClick={handleCloseModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <PokemonDetails pokemon={pokemon} />
              <CloseButton onClick={handleCloseModal}>Fechar</CloseButton>
            </ModalContent>
          </Modal>
        )}
      </>
    );
  }
);

export default PokemonCard;
