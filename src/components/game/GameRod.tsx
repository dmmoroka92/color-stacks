import { useDroppable } from "@dnd-kit/react"

import type { CylinderBlock } from "../../types/game"

import Cylinder from "./Cylinder"

type GameRodProps = {
  rodIndex: number
  blocks: CylinderBlock[]
}

function GameRod({
  rodIndex,
  blocks,
}: GameRodProps) {
  const { ref, isDropTarget } = useDroppable({
    id: `rod-${rodIndex}`,
    data: {
      rodIndex,
    },
  })

  return (
    <div
      ref={ref}
      className={[
        "relative flex h-[420px] min-w-0 flex-1 justify-center rounded-2xl transition",
        isDropTarget ? "bg-slate-100" : "",
      ].join(" ")}
    >
      <div
        className="absolute bottom-5 h-[330px] w-[7px] rounded-t-full
          bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 shadow-sm"
      />

      <div
        className="absolute bottom-4 h-[10px] w-[90%] max-w-[120px]
          rounded-[50%] bg-slate-300 shadow-sm"
      />

      <div className="absolute bottom-[24px] z-10 flex flex-col-reverse items-center">
        {blocks.map((block, index) => {
          const isTop = index === blocks.length - 1

          return (
            <Cylinder
              key={block.id}
              block={block}
              rodIndex={rodIndex}
              draggable={isTop}
            />
          )
        })}
      </div>
    </div>
  )
}

export default GameRod