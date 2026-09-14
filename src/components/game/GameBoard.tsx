import type { BlockColor } from "../../types/game"
import GameRod from "./GameRod"

const rods: BlockColor[][] = [
  ["red", "blue", "green", "yellow", "red", "blue", "green", "yellow"],
  ["green", "yellow", "red", "blue", "green", "yellow", "red", "blue"],
  ["blue", "red", "yellow", "green", "blue", "red", "yellow", "green"],
  ["yellow", "green", "blue", "red", "yellow", "green", "blue", "red"],
  [],
]

function GameBoard() {
  return (
    <section className="mt-8 w-full rounded-[32px] border border-slate-200 bg-white
      px-4 py-10 shadow-sm sm:px-8">
      <div className="mx-auto flex max-w-5xl items-end justify-between gap-2">
        {rods.map((blocks, index) => (
          <GameRod
            key={index}
            blocks={blocks}
          />
        ))}
      </div>
    </section>
  )
}

export default GameBoard