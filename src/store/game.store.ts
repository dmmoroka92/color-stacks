import { create } from "zustand";

type GameState = {
  moves: number
  makeMove: () => void
}

export const useGameStore = create<GameState>((set) => ({
  moves: 0,

  makeMove: () => set((state) => ({
    moves: state.moves + 1
  }))
}))