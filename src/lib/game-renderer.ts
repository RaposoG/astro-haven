export function drawShip(ctx: CanvasRenderingContext2D, player: any) {
  const { x, y, rotation, radius, invulnerable } = player;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);

  // Desenhar nave
  ctx.beginPath();

  // Se invulnerável, piscar
  if (invulnerable && Math.floor(Date.now() / 100) % 2 === 0) {
    ctx.strokeStyle = "rgba(0, 255, 0, 0.5)";
  } else {
    ctx.strokeStyle = "white";
  }

  ctx.lineWidth = 2;

  // Triângulo da nave
  ctx.moveTo(radius, 0);
  ctx.lineTo(-radius, -radius / 2);
  ctx.lineTo(-radius, radius / 2);
  ctx.closePath();

  ctx.stroke();

  // Desenhar propulsor se estiver aceler  radius / 2)
  ctx.closePath();

  ctx.stroke();

  // Desenhar propulsor se estiver acelerando
  if (player.velocity.x !== 0 || player.velocity.y !== 0) {
    ctx.beginPath();
    ctx.moveTo(-radius, 0);
    ctx.lineTo(-radius - 5, -radius / 4);
    ctx.lineTo(-radius - 10, 0);
    ctx.lineTo(-radius - 5, radius / 4);
    ctx.closePath();
    ctx.fillStyle = "orange";
    ctx.fill();
  }

  ctx.restore();
}

export function drawAsteroid(ctx: CanvasRenderingContext2D, asteroid: any) {
  const { x, y, radius, rotation, vertices, offset } = asteroid;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);

  ctx.beginPath();

  // Desenhar asteroide com vértices irregulares
  const numVertices = vertices || 8;
  const angleStep = (Math.PI * 2) / numVertices;

  for (let i = 0; i < numVertices; i++) {
    const angle = i * angleStep;
    const vertexRadius = radius * (offset ? offset[i] : 0.8 + Math.random() * 0.4);
    const vertexX = Math.cos(angle) * vertexRadius;
    const vertexY = Math.sin(angle) * vertexRadius;

    if (i === 0) {
      ctx.moveTo(vertexX, vertexY);
    } else {
      ctx.lineTo(vertexX, vertexY);
    }
  }

  ctx.closePath();
  ctx.strokeStyle = "#aaa";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();
}

export function drawProjectile(ctx: CanvasRenderingContext2D, projectile: any) {
  const { x, y, radius } = projectile;

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = "#0f0";
  ctx.fill();
}

export function drawExplosion(ctx: CanvasRenderingContext2D, explosion: any) {
  const { x, y, radius, currentFrame } = explosion;

  const maxFrames = 10;
  const frameProgress = Math.min(currentFrame / maxFrames, 1);
  const currentRadius = radius * (1 - frameProgress);
  const alpha = 1 - frameProgress;

  ctx.beginPath();
  ctx.arc(x, y, currentRadius, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, ${Math.floor(165 * (1 - frameProgress))}, 0, ${alpha})`;
  ctx.fill();

  // Partículas da explosão
  const numParticles = 8;
  const angleStep = (Math.PI * 2) / numParticles;

  for (let i = 0; i < numParticles; i++) {
    const angle = i * angleStep;
    const particleX = x + Math.cos(angle) * currentRadius * 1.5;
    const particleY = y + Math.sin(angle) * currentRadius * 1.5;

    ctx.beginPath();
    ctx.arc(particleX, particleY, currentRadius / 4, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 0, ${alpha})`;
    ctx.fill();
  }
}
