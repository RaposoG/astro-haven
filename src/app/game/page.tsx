"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import GameCanvas from "@/components/game-canvas";
import PlayerStats from "@/components/player-stats";

export default function GamePage() {
  const [playerName, setPlayerName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    // Gerar um nome aleatório se o usuário não fornecer um
    if (!playerName) {
      setPlayerName(`Piloto${Math.floor(Math.random() * 1000)}`);
    }
  }, [playerName]);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {!gameStarted ? (
        <div className="flex flex-col items-center justify-center flex-1 p-4">
          <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">Entrar na Batalha</h1>
            <div className="space-y-4">
              <div>
                <label htmlFor="playerName" className="block text-sm font-medium mb-1">
                  Nome do Piloto
                </label>
                <input type="text" id="playerName" value={playerName} onChange={(e) => setPlayerName(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Digite seu nome" />
              </div>
              <Button onClick={handleStartGame} className="w-full bg-green-600 hover:bg-green-700">
                Iniciar Jogo
              </Button>
              <Button asChild variant="outline" className="w-full border-gray-700 text-gray-400 hover:bg-gray-800">
                <Link href="/">Voltar</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-center p-2 bg-gray-900">
            <PlayerStats playerName={playerName} score={0} lives={3} />
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:bg-gray-800" onClick={() => setGameStarted(false)}>
              Sair
            </Button>
          </div>
          <div className="flex-1 relative">
            <GameCanvas playerName={playerName} />
          </div>
        </div>
      )}
    </div>
  );
}
