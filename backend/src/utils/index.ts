import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");

function calculateCatchRate(pokemonIndex: number): number {
  // Defina a taxa mínima e máxima de captura
  const minCatchRate = 1;
  const maxCatchRate = 100;
  const maxIndex = 1300; // Número máximo de Pokémon

  // Calcula a taxa de captura base
  const baseCatchRate = maxCatchRate * Math.exp(-pokemonIndex / maxIndex);

  // Adiciona um fator aleatório à taxa de captura
  const randomFactor = Math.random() * 20; // Ajuste este valor para alterar a quantidade de aleatoriedade
  const catchRate = baseCatchRate - randomFactor;

  // Garante que a taxa de captura esteja dentro do intervalo definido
  const clampedCatchRate = Math.max(
    minCatchRate,
    Math.min(maxCatchRate, catchRate)
  );

  return clampedCatchRate;
}

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err: Error, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

export { calculateCatchRate, authenticateToken };
