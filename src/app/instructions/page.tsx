import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Gamepad2, Shield, Zap } from "lucide-react"

export default function InstructionsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
          <Button asChild variant="ghost" className="mr-2 text-gray-400 hover:text-white hover:bg-gray-800">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Instruções</h1>
        </div>

        <div className="space-y-8">
          <section className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Gamepad2 className="mr-2 h-6 w-6 text-green-500" />
              Controles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Movimento</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Acelerar</span>
                    <kbd className="px-2 py-1 bg-gray-700 rounded">W</kbd> ou{" "}
                    <kbd className="px-2 py-1 bg-gray-700 rounded">↑</kbd>
                  </li>
                  <li className="flex justify-between">
                    <span>Girar Esquerda</span>
                    <kbd className="px-2 py-1 bg-gray-700 rounded">A</kbd> ou{" "}
                    <kbd className="px-2 py-1 bg-gray-700 rounded">←</kbd>
                  </li>
                  <li className="flex justify-between">
                    <span>Girar Direita</span>
                    <kbd className="px-2 py-1 bg-gray-700 rounded">D</kbd> ou{" "}
                    <kbd className="px-2 py-1 bg-gray-700 rounded">→</kbd>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Ações</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Atirar</span>
                    <kbd className="px-2 py-1 bg-gray-700 rounded">Espaço</kbd>
                  </li>
                  <li className="flex justify-between">
                    <span>Escudo</span>
                    <kbd className="px-2 py-1 bg-gray-700 rounded">Shift</kbd>
                  </li>
                  <li className="flex justify-between">
                    <span>Turbo</span>
                    <kbd className="px-2 py-1 bg-gray-700 rounded">E</kbd>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Zap className="mr-2 h-6 w-6 text-green-500" />
              Objetivo do Jogo
            </h2>
            <p className="mb-4">
              Sobreviva no espaço destruindo asteroides e derrotando outros jogadores. Colete power-ups para melhorar
              sua nave e aumente sua pontuação para subir no ranking.
            </p>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Pontuação</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Destruir asteroide pequeno: <span className="text-green-500">100 pontos</span>
                </li>
                <li>
                  Destruir asteroide médio: <span className="text-green-500">200 pontos</span>
                </li>
                <li>
                  Destruir asteroide grande: <span className="text-green-500">300 pontos</span>
                </li>
                <li>
                  Derrotar outro jogador: <span className="text-green-500">500 pontos</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Shield className="mr-2 h-6 w-6 text-green-500" />
              Power-ups
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-bold mb-2 text-blue-400">Escudo</h3>
                <p>Protege sua nave contra danos por 5 segundos.</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-bold mb-2 text-red-400">Tiro Duplo</h3>
                <p>Dispara dois projéteis de uma vez por 10 segundos.</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-bold mb-2 text-yellow-400">Velocidade</h3>
                <p>Aumenta a velocidade da sua nave por 8 segundos.</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-bold mb-2 text-purple-400">Vida Extra</h3>
                <p>Adiciona uma vida extra à sua nave.</p>
              </div>
            </div>
          </section>

          <div className="text-center">
            <Button asChild className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg">
              <Link href="/game">Jogar Agora</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
