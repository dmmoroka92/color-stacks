import { useDraggable } from "@dnd-kit/react"

import type {
  BlockColor,
  CylinderBlock,
} from "../../types/game"

type CylinderProps = {
  block: CylinderBlock
  rodIndex: number
  draggable: boolean
}

const colorStyles: Record<BlockColor, string> = {
  red: "from-red-400 via-red-500 to-red-700",
  blue: "from-blue-400 via-blue-500 to-blue-700",
  green: "from-emerald-400 via-emerald-500 to-emerald-700",
  yellow: "from-yellow-300 via-yellow-400 to-amber-600",
}

function Cylinder({
  block,
  rodIndex,
  draggable,
}: CylinderProps) {
  const { ref, isDragging } = useDraggable({
    id: block.id,
    disabled: !draggable,
    data: {
      rodIndex,
      blockId: block.id,
      color: block.color,
    },
  })

  return (
    <div
      ref={ref}
      className={[
        "relative h-8 w-20 rounded-[50%]",
        "bg-gradient-to-b",
        colorStyles[block.color],
        "shadow-md shadow-slate-900/15",
        draggable ? "cursor-grab" : "",
        isDragging ? "cursor-grabbing opacity-70" : "",
      ].join(" ")}
    >
      <div
        className={[
          "absolute left-1 right-1 top-[2px]",
          "h-3 rounded-[50%]",
          "bg-gradient-to-b",
          colorStyles[block.color],
          "brightness-110",
        ].join(" ")}
      />

      <div className="absolute bottom-[2px] left-1 right-1 h-2 rounded-[50%] bg-black/15" />

      <div
        className="absolute left-1/2 top-1 z-10 h-3 w-4
          -translate-x-1/2 rounded-[50%] bg-slate-800/70"
      />

      <div
        className="absolute left-1/2 top-[6px] z-20 h-[6px] w-[10px]
          -translate-x-1/2 rounded-[50%] bg-slate-300/80"
      />
    </div>
  )
}

export default Cylinder