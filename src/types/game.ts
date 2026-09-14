import type { BLOCK_COLORS } from "../constants/game"

export type BlockColor = (typeof BLOCK_COLORS)[number]

export type GameStatus =
  | "initializing"  
  | "paused"
  | "ongoing"
  | "finished"


export type CylinderBlock = {
  id: string
  color: BlockColor
}

export type Rod = {
  id: string
  blocks: CylinderBlock[]
}

export type GameState = {
  rods: Rod[]
  moves: number
  status: GameStatus
  startedAt: string | null
  finishedAt: string | null
}