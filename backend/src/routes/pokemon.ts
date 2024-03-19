import express, { Request, Response } from "express";
import { authenticateToken, calculateCatchRate } from "../utils/";
import db from "../db";

const router = express.Router();

router.post(
  "/catch",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const { pokemonIndex } = req.body;
      const userId = req.user.id;

      // Calcule a taxa de captura do Pokémon
      const catchRate = calculateCatchRate(pokemonIndex);

      // Gere um número aleatório entre 1 e 100
      const randomNumber = 100 - (Math.floor(Math.random() * 100) + 1);

      // Se o número aleatório for menor ou igual à taxa de captura, o Pokémon é capturado
      if (catchRate <= randomNumber) {
        const { pokemonIndex } = req.body;
        const existingPokemon = await db("pokemons_treinadores")
          .where({ index: pokemonIndex, treinador_id: userId })
          .first();

        if (existingPokemon) {
          // Se o Pokémon existir, incremente a quantidade
          await db("pokemons_treinadores")
            .where({ index: pokemonIndex, treinador_id: userId })
            .increment("quantity", 1);
        } else {
          // Se o Pokémon não existir, crie um novo registro
          await db("pokemons_treinadores").insert({
            pokemon_nome: "pokemon",
            treinador_id: userId,
            index: pokemonIndex,
            quantity: 1,
          });
        }
        res.status(200).json({ message: "Pokemon caught" });
      } else {
        res.status(200).json({ message: "Pokemon escaped" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
