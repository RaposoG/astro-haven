"use client";

import { useEffect, useRef, useState } from "react";
import { useKeyboardControls } from "@/hooks/use-keyboard-controls";
import { drawShip, drawAsteroid, drawProjectile, drawExplosion } from "@/lib/game-renderer";
import { checkCollision } from "@/lib/collision-detection";
import { generateAsteroid } from "@/lib/game-objects";

interface GameCanvasProps {
  playerName: string;
}

export default function GameCanvas({ playerName }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameObjects, setGameObjects] = useState({
    player: {
      x: 0,
      y: 0,
      rotation: 0,
      velocity: { x: 0, y: 0 },
      acceleration: 0.1,
      rotationSpeed: 0.1,
      maxSpeed: 5,
      friction: 0.98,
      radius: 15,
      lives: 3,
      score: 0,
      invulnerable: false,
      invulnerableTime: 0,
    },
    asteroids: [] as any[],
    projectiles: [] as any[],
    explosions: [] as any[],
    otherPlayers: [] as any[],
  });

  const { keys } = useKeyboardControls();
  const animationFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // Inicializar o jogo
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ajustar o tamanho do canvas para preencher o contêiner
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      // Reposicionar o jogador no centro
      setGameObjects((prev) => ({
        ...prev,
        player: {
          ...prev.player,
          x: canvas.width / 2,
          y: canvas.height / 2,
        },
      }));
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Gerar asteroides iniciais
    const initialAsteroids = Array.from({ length: 10 }, () => generateAsteroid(canvas.width, canvas.height, gameObjects.player.x, gameObjects.player.y));

    setGameObjects((prev) => ({
      ...prev,
      player: {
        ...prev.player,
        x: canvas.width / 2,
        y: canvas.height / 2,
      },
      asteroids: initialAsteroids,
    }));

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Loop principal do jogo
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gameLoop = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // Limpar o canvas
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Atualizar o estado do jogo
      updateGameState(deltaTime / 16);

      // Renderizar o jogo
      renderGame(ctx);

      // Continuar o loop
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [gameObjects]);

  // Atualizar o estado do jogo
  const updateGameState = (deltaTime: number) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    // Atualizar o jogador
    setGameObjects((prev) => {
      const player = { ...prev.player };

      // Aplicar controles
      if (keys.forward) {
        player.velocity.x += Math.cos(player.rotation) * player.acceleration * deltaTime;
        player.velocity.y += Math.sin(player.rotation) * player.acceleration * deltaTime;
      }

      if (keys.left) {
        player.rotation -= player.rotationSpeed * deltaTime;
      }

      if (keys.right) {
        player.rotation += player.rotationSpeed * deltaTime;
      }

      // Aplicar física
      player.velocity.x *= player.friction;
      player.velocity.y *= player.friction;

      // Limitar velocidade
      const speed = Math.sqrt(player.velocity.x ** 2 + player.velocity.y ** 2);
      if (speed > player.maxSpeed) {
        player.velocity.x = (player.velocity.x / speed) * player.maxSpeed;
        player.velocity.y = (player.velocity.y / speed) * player.maxSpeed;
      }

      // Atualizar posição
      player.x += player.velocity.x * deltaTime;
      player.y += player.velocity.y * deltaTime;

      // Envolver nas bordas (wrap around)
      if (player.x < 0) player.x = canvas.width;
      if (player.x > canvas.width) player.x = 0;
      if (player.y < 0) player.y = canvas.height;
      if (player.y > canvas.height) player.y = 0;

      // Atualizar invulnerabilidade
      if (player.invulnerable) {
        player.invulnerableTime -= deltaTime;
        if (player.invulnerableTime <= 0) {
          player.invulnerable = false;
        }
      }

      // Atualizar projéteis
      let projectiles = [...prev.projectiles];

      // Adicionar novo projétil se o jogador atirou
      if (keys.shoot) {
        projectiles.push({
          x: player.x + Math.cos(player.rotation) * player.radius,
          y: player.y + Math.sin(player.rotation) * player.radius,
          velocity: {
            x: Math.cos(player.rotation) * 10,
            y: Math.sin(player.rotation) * 10,
          },
          radius: 3,
          lifeTime: 60, // frames
        });
      }

      // Atualizar projéteis existentes
      projectiles = projectiles
        .map((projectile) => ({
          ...projectile,
          x: projectile.x + projectile.velocity.x * deltaTime,
          y: projectile.y + projectile.velocity.y * deltaTime,
          lifeTime: projectile.lifeTime - deltaTime,
        }))
        .filter((projectile) => projectile.lifeTime > 0 && projectile.x > 0 && projectile.x < canvas.width && projectile.y > 0 && projectile.y < canvas.height);

      // Atualizar asteroides
      let asteroids = [...prev.asteroids];

      // Mover asteroides
      asteroids = asteroids.map((asteroid) => ({
        ...asteroid,
        x: asteroid.x + asteroid.velocity.x * deltaTime,
        y: asteroid.y + asteroid.velocity.y * deltaTime,
        rotation: asteroid.rotation + asteroid.rotationSpeed * deltaTime,
      }));

      // Envolver asteroides nas bordas
      asteroids = asteroids.map((asteroid) => ({
        ...asteroid,
        x: asteroid.x < 0 ? canvas.width : asteroid.x > canvas.width ? 0 : asteroid.x,
        y: asteroid.y < 0 ? canvas.height : asteroid.y > canvas.height ? 0 : asteroid.y,
      }));

      // Verificar colisões entre projéteis e asteroides
      let newExplosions = [...prev.explosions];
      let score = player.score;

      projectiles.forEach((projectile, pIndex) => {
        asteroids.forEach((asteroid, aIndex) => {
          if (checkCollision(projectile, asteroid)) {
            // Marcar projétil para remoção
            projectiles[pIndex].lifeTime = 0;

            // Adicionar explosão
            newExplosions.push({
              x: asteroid.x,
              y: asteroid.y,
              radius: asteroid.radius,
              lifeTime: 20, // frames
              currentFrame: 0,
            });

            // Aumentar pontuação
            score += Math.floor(asteroid.radius) * 10;

            // Dividir asteroide ou remover
            if (asteroid.radius > 20) {
              // Dividir em dois asteroides menores
              for (let i = 0; i < 2; i++) {
                asteroids.push({
                  x: asteroid.x,
                  y: asteroid.y,
                  radius: asteroid.radius / 2,
                  velocity: {
                    x: (Math.random() - 0.5) * 2,
                    y: (Math.random() - 0.5) * 2,
                  },
                  rotation: Math.random() * Math.PI * 2,
                  rotationSpeed: (Math.random() - 0.5) * 0.05,
                  vertices: Math.floor(Math.random() * 3) + 5,
                  offset: Array.from({ length: asteroid.vertices }, () => 0.8 + Math.random() * 0.4),
                });
              }
            }

            // Marcar asteroide para remoção
            asteroids[aIndex].toRemove = true;
          }
        });
      });

      // Remover asteroides marcados
      asteroids = asteroids.filter((asteroid) => !asteroid.toRemove);

      // Verificar colisões entre jogador e asteroides
      if (!player.invulnerable) {
        for (const asteroid of asteroids) {
          if (checkCollision(player, asteroid)) {
            // Jogador atingido
            player.lives -= 1;
            player.invulnerable = true;
            player.invulnerableTime = 120; // 2 segundos a 60fps

            // Adicionar explosão
            newExplosions.push({
              x: player.x,
              y: player.y,
              radius: player.radius * 2,
              lifeTime: 30,
              currentFrame: 0,
            });

            // Reposicionar jogador no centro
            player.x = canvas.width / 2;
            player.y = canvas.height / 2;
            player.velocity = { x: 0, y: 0 };
            break;
          }
        }
      }

      // Atualizar explosões
      newExplosions = newExplosions
        .map((explosion) => ({
          ...explosion,
          lifeTime: explosion.lifeTime - deltaTime,
          currentFrame: explosion.currentFrame + 0.5 * deltaTime,
        }))
        .filter((explosion) => explosion.lifeTime > 0);

      // Adicionar novos asteroides se necessário
      if (asteroids.length < 5) {
        asteroids.push(generateAsteroid(canvas.width, canvas.height, player.x, player.y));
      }

      return {
        ...prev,
        player: {
          ...player,
          score,
        },
        projectiles,
        asteroids,
        explosions: newExplosions,
      };
    });
  };

  // Renderizar o jogo
  const renderGame = (ctx: CanvasRenderingContext2D) => {
    // Desenhar estrelas de fundo
    drawStars(ctx);

    // Desenhar projéteis
    gameObjects.projectiles.forEach((projectile) => {
      drawProjectile(ctx, projectile);
    });

    // Desenhar asteroides
    gameObjects.asteroids.forEach((asteroid) => {
      drawAsteroid(ctx, asteroid);
    });

    // Desenhar jogador
    drawShip(ctx, gameObjects.player);

    // Desenhar explosões
    gameObjects.explosions.forEach((explosion) => {
      drawExplosion(ctx, explosion);
    });

    // Desenhar outros jogadores
    gameObjects.otherPlayers.forEach((player) => {
      drawShip(ctx, player);

      // Desenhar nome do jogador
      ctx.fillStyle = "white";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(player.name, player.x, player.y - player.radius - 10);
    });

    // Desenhar nome do jogador principal
    ctx.fillStyle = "white";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText(playerName, gameObjects.player.x, gameObjects.player.y - gameObjects.player.radius - 10);
  };

  // Desenhar estrelas de fundo
  const drawStars = (ctx: CanvasRenderingContext2D) => {
    // Usar um padrão fixo de estrelas para evitar recriá-las a cada frame
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const numStars = 100;

    for (let i = 0; i < numStars; i++) {
      const x = (i * 17) % canvas.width;
      const y = (i * 23) % canvas.height;
      const size = (i % 3) + 1;

      ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + Math.random() * 0.5})`;
      ctx.fillRect(x, y, size, size);
    }
  };

  return <canvas ref={canvasRef} className="w-full h-full bg-black" tabIndex={0} />;
}
