import express from "express";
import { calculateCatchRate } from "../utils/";

const router = express.Router();

router.post("/catch", async (req, res) => {
  try {
    const { pokemonIndex } = req.body;
    const catchRate = calculateCatchRate(pokemonIndex);

    // Gere um número aleatório entre 1 e 100
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    // Se o número aleatório for menor ou igual à taxa de captura, o Pokémon é capturado
    if (randomNumber <= catchRate) {
      res.status(200).json({ message: "Pokemon caught" });
    } else {
      res.status(200).json({ message: "Pokemon escaped" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
