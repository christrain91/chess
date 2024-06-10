import { Board } from './components/Board'
import { useGameStateStore } from './stores/GameStateStore'

function App() {
  const turn = useGameStateStore((state) => state.turn)
  
  return (
    <div className="p-4 h-screen w-screen overflow-hidden flex flex-col xl:flex-row">
      <div className="flex-1">
      <Board />
      </div>
      <div className="flex-1">
        <div className="text-center font-semibold text-xl">
          {turn === 'white' ? 'White' : 'Black'} to play
          </div>
      </div>
      </div>
  )
}

export default App
