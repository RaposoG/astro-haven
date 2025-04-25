export function generateAsteroid(canvasWidth: number, canvasHeight: number, playerX: number, playerY: number) {
  // Gerar posição longe do jogador
  let x, y;
  do {
    x = Math.random() * canvasWidth;
    y = Math.random() * canvasHeight;
  } while (Math.sqrt((x - playerX) ** 2 + (y - playerY) ** 2) < 200);

  // Número de vértices
  const vertices = Math.floor(Math.random() * 3) + 5;

  // Offset para cada vértice para criar forma irregular
  const offset = Array.from({ length: vertices }, () => 0.8 + Math.random() * 0.4);

  return {
    x,
    y,
    radius: 30 + Math.random() * 20,
    velocity: {
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
    },
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.05,
    vertices,
    offset,
  };
}
