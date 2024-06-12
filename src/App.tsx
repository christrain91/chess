import { Board } from './components/Board'
import { MoveHistory } from './components/MoveHistory'
import { useGameStateStore } from './stores/GameStateStore'
import { Color } from './types'

function App() {
  const turn = useGameStateStore((state) => state.turn)
  const result = useGameStateStore((state) => state.result)

  return (
    <div className="p-4 h-screen w-screen overflow-hidden flex flex-col xl:flex-row">
      <div className="flex-1 flex justify-center">
        <div className="w-full h-full">
          {/* <Board invert={turn === Color.BLACK} /> */}
          <Board invert={false} />
        </div>
      </div>
      <div className="min-w-[500px] p-4">
        <div className="text-center font-semibold text-xl">
          {turn === Color.WHITE ? 'White' : 'Black'} to play
        </div>
        {/* Result: {JSON.stringify(result, null, 2)} */}
        <MoveHistory />
      </div>
    </div>
  )
}

export default App
