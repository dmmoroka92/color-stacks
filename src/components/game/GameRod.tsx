import type { BlockColor } from "../../types/game"
import Cylinder from "./Cylinder"

type GameRodProps = {
  blocks: BlockColor[]
}

function GameRod({ blocks }: GameRodProps) {
  return (
    <div className="relative flex h-[420px] min-w-0 flex-1 justify-center">
      <div className="absolute bottom-5 h-[330px] w-[7px] rounded-t-full
        bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 shadow-sm" />

      <div className="absolute bottom-4 h-[10px] w-[90%] max-w-[120px]
        rounded-[50%] bg-slate-300 shadow-sm" />

      <div className="absolute bottom-[24px] z-10 flex flex-col-reverse items-center">
        {blocks.map((color, index) => (
          <Cylinder
            key={`${color}-${index}`}
            color={color}
          />
        ))}
      </div>
    </div>
  )
}

export default GameRod