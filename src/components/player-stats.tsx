import { Shield } from "lucide-react";

interface PlayerStatsProps {
  playerName: string;
  score: number;
  lives: number;
}

export default function PlayerStats({ playerName, score, lives }: PlayerStatsProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="font-bold text-green-500">{playerName}</div>
      <div className="text-sm">
        Pontuação: <span className="font-bold">{score}</span>
      </div>
      <div className="flex items-center">
        {Array.from({ length: lives }).map((_, i) => (
          <Shield key={i} className="w-4 h-4 text-green-500 fill-green-500" />
        ))}
      </div>
    </div>
  );
}
