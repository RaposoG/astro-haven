import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="max-w-3xl w-full text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
          Asteroid <span className="text-green-500">MMO</span>
        </h1>
        <p className="text-xl text-gray-400">
          Um jogo multiplayer online onde você pode batalhar contra outros jogadores no espaço
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg">
            <Link href="/game">Jogar Agora</Link>
          </Button>
          <Button asChild variant="outline" className="border-green-600 text-green-500 hover:bg-green-900/20 px-8 py-6 text-lg">
            <Link href="/instructions">Instruções</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
