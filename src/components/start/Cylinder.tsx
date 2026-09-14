import type { BlockColor } from "../types/game"

type CylinderProps = {
  color: BlockColor
  animated?: boolean
}

const colorStyles: Record<BlockColor, string> = {
  red: "from-red-400 via-red-500 to-red-700",
  blue: "from-blue-400 via-blue-500 to-blue-700",
  green: "from-emerald-400 via-emerald-500 to-emerald-700",
  yellow: "from-yellow-300 via-yellow-400 to-amber-600",
}

function Cylinder({
  color,
  animated = false,
}: CylinderProps) {
  return (
    <div
      className={[
        "relative",
        "h-6",
        "w-[68px]",
        "rounded-[50%]",
        "bg-gradient-to-b",
        colorStyles[color],
        "shadow-md",
        animated ? "shadow-slate-900/20" : "shadow-slate-900/15",
      ].join(" ")}
    >
      {/* Bright upper elliptical surface */}
      <div
        className={[
          "absolute",
          "left-[3px]",
          "right-[3px]",
          "top-[1px]",
          "h-[11px]",
          "rounded-[50%]",
          "bg-gradient-to-b",
          colorStyles[color],
          "brightness-110",
        ].join(" ")}
      />

      {/* Upper shine */}
      <div className="absolute left-[10px] right-[10px] top-[3px] h-[4px]
        rounded-[50%] bg-white/20 blur-[1px]" />

      {/* Dark lower edge gives cylinder depth */}
      <div className="absolute bottom-[1px] left-[4px] right-[4px] h-[7px]
        rounded-[50%] bg-black/15" />

      {/* Central hole shadow */}
      <div className="absolute left-1/2 top-[3px] z-10 h-[9px] w-[13px] -translate-x-1/2
        rounded-[50%] bg-slate-800/75 shadow-inner" />

      {/* Inner edge of the hole */}
      <div className="absolute left-1/2 top-[4px] z-20 h-[5px] w-[8px] -translate-x-1/2
        rounded-[50%] bg-slate-300/80" />

      {/* Small bottom highlight */}
      <div className="absolute bottom-[3px] left-[11px] h-[2px] w-[20px] rounded-full
        bg-white/10" />
    </div>
  )
}

export default Cylinder