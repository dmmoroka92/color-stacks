import { useEffect, useState } from "react"
import { GAME_TIME_LIMIT_SECONDS } from "../../constants/game"
import { useGameStore } from "../../store/game.store"

function GameTimer() {
  const [seconds, setSeconds] = useState<number>(0)
  const setStatus = useGameStore(store => store.setGameStatus)

  const gameStatus = useGameStore(store => store.gameStatus)
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  useEffect(() => {
    if (gameStatus !== "ongoing") return

    const intervalId = setInterval(() => {
      setSeconds((seconds) => {
        const nextSeconds = seconds + 1

        if (nextSeconds >= GAME_TIME_LIMIT_SECONDS) {
          clearInterval(intervalId)
          setStatus("finished")
        }

        return nextSeconds
      })
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [gameStatus])

  const formattedTime = `
    ${String(minutes).padStart(2, "0")}:
    ${String(remainingSeconds).padStart(2, "0")}
  `

  return (
    <div className="px-8 py-3 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
        Time
      </p>

      <p className="mt-1 text-2xl font-bold tabular-nums">
        {formattedTime}
      </p>
    </div>
  )
}

export default GameTimer