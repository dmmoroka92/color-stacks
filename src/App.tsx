import StartScreen from "./components/start/StartScreen"
import { useGameStore } from "./store/game.store"

function App() {
  const gameStatus = useGameStore(store => store.gameStatus)

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center
        justify-center px-5 py-12">
        {
          gameStatus === null && <StartScreen />
        }

        {
          gameStatus === "initializing" && (
            <p>Game initialization...</p>
          )
        }
      </div>
    </main>
  )
}
export default App