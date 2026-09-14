import { motion } from "motion/react"
import GamePreview from "./components/start/GamePreview"

function App() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-5 py-12">
        <section className="flex w-full max-w-3xl flex-col items-center text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-indigo-600">
            Puzzle Game
          </p>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Color Stack
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Sort the colored cylinders until every rod contains a single color.
            Think ahead, move carefully, and complete the puzzle in as few
            moves as possible.
          </p>

          <div className="mt-10 w-full rounded-[28px] border border-slate-200
            bg-white px-4 py-6 shadow-sm sm:px-8 sm:py-8">
            <GamePreview />
          </div>

          <motion.button
            type="button"
            whileHover={{
              scale: 1.035,
              y: -2,
            }}
            whileTap={{
              scale: 0.96,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 22,
            }}
            className="mt-8 rounded-2xl bg-slate-900 px-10 py-4 text-base font-semibold text-white
              shadow-lg shadow-slate-900/10 transition-colors hover:bg-slate-800"
          >
            Start Game
          </motion.button>
        </section>
      </div>
    </main>
  )
}
export default App