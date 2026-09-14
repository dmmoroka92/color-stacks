import { useAnimate } from "motion/react"
import { useEffect, useRef } from "react"
import { DISC_HEIGHT, DISC_WIDTH, ROD_BOTTOM, ROD_TOP, STACK_GAP } from "../../constants/preview"
import type { BlockColor } from "../../types/game"
import Cylinder from "./Cylinder"
import Rod from "./Rod"

const previewRods: BlockColor[][] = [
  ["blue", "green"],
  ["green", "yellow"],
  ["red"],
  ["yellow", "blue"],
  ["green", "red"],
]

function GamePreview() {
  const stageRef = useRef<HTMLDivElement>(null)

  const rodRefs = useRef<(HTMLDivElement | null)[]>([])

  const [scope, animate] = useAnimate()

  useEffect(() => {
    let running = true

    const sleep = (milliseconds: number) =>
      new Promise((resolve) => setTimeout(resolve, milliseconds))

    const getRodPositions = () => {
      const stage = stageRef.current

      if (!stage) {
        return []
      }

      const stageRect = stage.getBoundingClientRect()

      return rodRefs.current.map((rod) => {
        if (!rod) {
          return 0
        }

        const rodRect = rod.getBoundingClientRect()

        return (
          rodRect.left -
          stageRect.left +
          rodRect.width / 2 -
          DISC_WIDTH / 2
        )
      })
    }

    const getLandingY = (rodIndex: number) => {
      const staticBlocks = previewRods[rodIndex].length

      const blockStep = DISC_HEIGHT + STACK_GAP

      return ROD_BOTTOM - DISC_HEIGHT - staticBlocks * blockStep
    }

    const runAnimation = async () => {
      // Give the browser one frame to calculate layout.
      await sleep(150)

      while (running) {
        const positions = getRodPositions()

        if (positions.length !== 5) {
          return
        }

        /*
         * Start above Rod 1.
         */
        await animate(
          scope.current,
          {
            x: positions[0],
            y: ROD_TOP - DISC_HEIGHT / 2,
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
          },
          {
            duration: 0,
          },
        )

        /*
         * Rod 1 -> Rod 2 -> Rod 3 -> Rod 4 -> Rod 5 -> Rod 1
         */
        for (let currentRod = 0; currentRod < 5; currentRod++) {
          if (!running) {
            return
          }

          const currentPositions = getRodPositions()

          const nextRod = (currentRod + 1) % 5

          const landingY = getLandingY(currentRod)

          /*
           * 1. Slide down the current rod.
           */
          await animate(
            scope.current,
            {
              x: currentPositions[currentRod],
              y: landingY,
              rotate: 0,
            },
            {
              duration: 0.62,
              ease: [0.25, 0.8, 0.25, 1],
            },
          )

          /*
           * 2. Tiny landing compression.
           */
          await animate(
            scope.current,
            {
              scaleX: 1.04,
              scaleY: 0.92,
            },
            {
              duration: 0.08,
            },
          )

          await animate(
            scope.current,
            {
              scaleX: 1,
              scaleY: 1,
            },
            {
              duration: 0.14,
              ease: "easeOut",
            },
          )

          /*
           * Let the player visually understand:
           * "the block has landed on this stack."
           */
          await sleep(250)

          if (!running) {
            return
          }

          /*
           * 3. Slide upward.
           *
           * The cylinder has to completely clear the rod
           * before horizontal movement begins.
           */
          const clearedRodY = ROD_TOP - DISC_HEIGHT - 18

          await animate(
            scope.current,
            {
              y: clearedRodY,
              rotate: 0,
            },
            {
              duration: 0.55,
              ease: [0.4, 0, 0.2, 1],
            },
          )

          if (!running) {
            return
          }

          /*
           * 4. Jump/arc to next rod.
           */
          const nextPositions = getRodPositions()

          await animate(
            scope.current,
            {
              x: [
                nextPositions[currentRod],
                (nextPositions[currentRod] + nextPositions[nextRod]) / 2,
                nextPositions[nextRod],
              ],

              y: [
                clearedRodY,
                clearedRodY - 26,
                clearedRodY,
              ],

              rotate: [
                0,
                nextRod === 0 ? -5 : 5,
                0,
              ],
            },
            {
              duration: nextRod === 0 ? 0.85 : 0.52,
              ease: "easeInOut",
            },
          )
        }
      }
    }

    runAnimation()

    return () => {
      running = false
    }
  }, [animate, scope])

  return (
    <div>
      <div
        ref={stageRef}
        className="relative mx-auto h-[260px] w-full max-w-[620px]"
      >
        {/* Static rods */}
        <div className="absolute inset-0 flex items-end justify-between px-2 sm:px-6">
          {previewRods.map((blocks, rodIndex) => (
            <Rod
              key={rodIndex}
              blocks={blocks}
              rodRef={(element) => {
                rodRefs.current[rodIndex] = element
              }}
            />
          ))}
        </div>

        {/* Animated cylinder */}
        <div
          ref={scope}
          className="absolute left-0 top-0 z-30"
          style={{
            width: DISC_WIDTH,
            height: DISC_HEIGHT,
          }}
        >
          <Cylinder
            color="red"
            animated
          />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center
        gap-2 text-sm font-medium text-slate-400">
        <span>Move</span>

        <span className="text-slate-300">•</span>

        <span>Stack</span>

        <span className="text-slate-300">•</span>

        <span>Sort</span>
      </div>
    </div>
  )
}

export default GamePreview