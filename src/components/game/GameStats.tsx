import { useGameStore } from "../../store/game.store"
import GameTimer from "./GameTimer"

function GameStats() {
  const moves = useGameStore(store => store.moves)

  return (
    <div className="flex items-center overflow-hidden rounded-2xl
      border border-slate-200 bg-white">
      <GameTimer />

      <div className="h-12 w-px bg-slate-200" />

      <div className="px-8 py-3 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          Moves
        </p>

        <p className="mt-1 text-2xl font-bold tabular-nums">
          {moves}
        </p>
      </div>
    </div>
  )
}

export default GameStats