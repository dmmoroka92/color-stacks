import { STACK_GAP } from "../../constants/preview"
import type { BlockColor } from "../../types/game"
import Cylinder from "./Cylinder"

type RodProps = {
  blocks: BlockColor[]
  rodRef: (element: HTMLDivElement | null) => void
}

function Rod({
  blocks,
  rodRef,
}: RodProps) {
  return (
    <div
      ref={rodRef}
      className="relative h-[240px] w-[68px] shrink-0"
    >
      {/* Rod shadow */}
      <div className="absolute bottom-[16px] left-1/2 h-[174px] w-[8px] -translate-x-1/2 
        rounded-full bg-slate-300/40 blur-[2px]" />

      {/* Main rod */}
      <div className="absolute bottom-[18px] left-1/2 h-[172px] w-[6px] -translate-x-1/2 
        rounded-t-full bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 shadow-sm" />

      {/* Rod highlight */}
      <div className="absolute bottom-[24px] left-[calc(50%-1px)] h-[160px] w-[1px] 
        rounded-full bg-white/70" />

      {/* Static cylinders */}
      <div className="absolute bottom-[22px] left-0 z-10 flex w-full
        flex-col-reverse items-center">
        {blocks.map((color, index) => (
          <div
            key={`${color}-${index}`}
            style={{
              marginTop: index === 0 ? 0 : STACK_GAP,
            }}
          >
            <Cylinder color={color} />
          </div>
        ))}
      </div>

      {/* Base */}
      <div className="absolute bottom-[14px] left-1/2 h-[9px] w-[78px]
        -translate-x-1/2 rounded-[50%] bg-slate-300 shadow-sm" />

      <div className="absolute bottom-[17px] left-1/2 h-[5px] w-[72px]
        -translate-x-1/2 rounded-[50%] bg-gradient-to-r from-slate-300
        via-slate-100 to-slate-400" />
    </div>
  )
}

export default Rod
