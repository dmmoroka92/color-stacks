import GameBoard from "./GameBoard"
import GameHeader from "./GameHeader"
import GameStats from "./GameStats"

export function GameScreen() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-6">
        <GameHeader />

        <div className="mt-6 flex w-full items-center justify-between">
          <GameStats />

          <button
            type="button"
            className="rounded-xl border border-slate-300
              bg-white px-6 py-3 font-semibold text-slate-700
              transition hover:bg-slate-100"
          >
            Pause Game
          </button>
        </div>

        <GameBoard />
      </div>
    </main>
  )
}
