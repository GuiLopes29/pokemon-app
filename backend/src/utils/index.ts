function calculateCatchRate(pokemonIndex: number): number {
  const minCatchRate = 10;
  const maxCatchRate = 100;

  const maxIndex = 898; // Para todas as gerações de Pokémons até agora

  const catchRate =
    maxCatchRate - (pokemonIndex / maxIndex) * (maxCatchRate - minCatchRate);

  return Math.max(minCatchRate, Math.min(maxCatchRate, catchRate));
}

export { calculateCatchRate };
