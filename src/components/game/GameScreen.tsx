import { useGameStore } from "../../store/game.store"
import GameBoard from "./GameBoard"
import GameHeader from "./GameHeader"
import GameStats from "./GameStats"

export function GameScreen() {
  const pauseGame = useGameStore(store => store.pauseGame)
  const resumeGame = useGameStore(store => store.resumeGame)
  const gameStatus = useGameStore(store => store.gameStatus)

  const isPaused = gameStatus === "paused"

  const handlePauseResume = () => {
    if (gameStatus === "ongoing") {
      pauseGame()
      return
    }

    if (gameStatus === "paused") {
      resumeGame()
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-6">
        <GameHeader />

        <div className="mt-6 flex w-full items-center justify-between">
          <GameStats />

          <button
            type="button"
            onClick={handlePauseResume}
            className="rounded-xl border border-slate-300
              bg-white px-6 py-3 font-semibold text-slate-700
              transition hover:bg-slate-100"
          >
            {isPaused ? "Resume game" : "Pause game"}
          </button>
        </div>

        <GameBoard />
      </div>
    </main>
  )
}
