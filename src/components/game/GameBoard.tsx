import { DragDropProvider } from "@dnd-kit/react"
import { useState } from "react"

import { useGameStore } from "../../store/game.store"
import type {
  BlockColor,
  CylinderBlock,
} from "../../types/game"
import { shuffle } from "../../utils"

import GameRod from "./GameRod"
import { BLOCKS_PER_ROD } from "../../constants/game"

const createRod = (colors: BlockColor[]): CylinderBlock[] => {
  return shuffle(
    colors.map((color) => ({
      id: crypto.randomUUID(),
      color,
    })),
  )
}

const initialRods: CylinderBlock[][] = [
  createRod([
    "red",
    "blue",
    "green",
    "yellow",
    "red",
    "blue",
    "green",
    "yellow",
  ]),

  createRod([
    "green",
    "yellow",
    "red",
    "blue",
    "green",
    "yellow",
    "red",
    "blue",
  ]),

  createRod([
    "blue",
    "red",
    "yellow",
    "green",
    "blue",
    "red",
    "yellow",
    "green",
  ]),

  createRod([
    "yellow",
    "green",
    "blue",
    "red",
    "yellow",
    "green",
    "blue",
    "red",
  ]),

  [],
]

function GameBoard() {
  const [rods, setRods] = useState(initialRods)
  const setGameStatus = useGameStore(store => store.setGameStatus)

  const makeMove = useGameStore((state) => state.makeMove)

  function isGameFinished(rods: CylinderBlock[][]): boolean {
    return rods.every((rod) => {
      if (rod.length === 0) {
        return true
      }
  
      if (rod.length !== BLOCKS_PER_ROD) {
        return false
      }
  
      const firstColor = rod[0].color
  
      return rod.every((block) => block.color === firstColor)
    })
  }

  const handleDragEnd = (event: Parameters<
    NonNullable<
      React.ComponentProps<typeof DragDropProvider>["onDragEnd"]
    >
  >[0]) => {
    if (event.canceled) return

    const { source, target } = event.operation

    if (!source || !target) return

    const sourceRodIndex = source.data?.rodIndex
    const targetRodIndex = target.data?.rodIndex

    if (
      typeof sourceRodIndex !== "number" ||
      typeof targetRodIndex !== "number"
    ) {
      return
    }

    if (sourceRodIndex === targetRodIndex) return

    let moved = false
    let finished = false

    setRods((currentRods) => {
      const nextRods = currentRods.map((rod) => [...rod])

      const sourceRod = nextRods[sourceRodIndex]
      const targetRod = nextRods[targetRodIndex]

      if (targetRod.length >= BLOCKS_PER_ROD) {
        return currentRods
      }

      const cylinder = sourceRod.pop()

      if (!cylinder) {
        return currentRods
      }

      targetRod.push(cylinder)

      moved = true
      finished = isGameFinished(nextRods)

      return nextRods
    })

    if (moved) makeMove()

    if (finished) setGameStatus("finished")
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <section
        className="mt-8 w-full rounded-[32px] border border-slate-200
          bg-white px-4 py-10 shadow-sm sm:px-8"
      >
        <div className="mx-auto flex max-w-5xl items-end justify-between gap-2">
          {rods.map((blocks, index) => (
            <GameRod
              key={index}
              rodIndex={index}
              blocks={blocks}
            />
          ))}
        </div>
      </section>
    </DragDropProvider>
  )
}

export default GameBoard