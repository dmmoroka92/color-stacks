import { useGameStore } from "./store/game.store"

function App() {
  const moves = useGameStore(store => store.moves)
  const makeMove = useGameStore(store => store.makeMove)

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="flex flex-col gap-4 min-h-screen items-center justify-center">
        <h1 className="text-5xl font-bold">
          Color Stack
        </h1>

        <span>Clicks: {moves}</span>

        <button
          onClick={makeMove}
          className="rounded-lg bg-indigo-500 px-6 py-3 font-semibold"
        >
          Make move
        </button>
      </div>
    </main>
  )
}

export default App