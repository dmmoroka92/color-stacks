import { create } from "zustand";
import type { GameStatus } from "../types/game";

type GameState = {
  gameStatus: GameStatus
  moves: number
  makeMove: () => void
  setGameStatus: (status: GameStatus) => void
}

export const useGameStore = create<GameState>((set) => ({
  gameStatus: null,
  moves: 0,

  makeMove: () => set((state) => ({
    moves: state.moves + 1
  })),

  setGameStatus: (gameStatus) => set({
    gameStatus
  })
}))