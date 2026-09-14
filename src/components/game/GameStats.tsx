function GameStats() {
  return (
    <div className="flex items-center overflow-hidden rounded-2xl
      border border-slate-200 bg-white">
      <div className="px-8 py-3 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          Time
        </p>

        <p className="mt-1 text-2xl font-bold tabular-nums">
          00:00
        </p>
      </div>

      <div className="h-12 w-px bg-slate-200" />

      <div className="px-8 py-3 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          Moves
        </p>

        <p className="mt-1 text-2xl font-bold tabular-nums">
          0
        </p>
      </div>
    </div>
  )
}

export default GameStats