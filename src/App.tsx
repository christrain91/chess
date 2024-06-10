import { Board } from './components/Board'
import { useGameStateStore } from './stores/GameStateStore'

function App() {
  const legalMovesForSelectedPiece = useGameStateStore((state) => state.legalMovesForSelectedPiece)
  
  return (
    <div className="p-4 h-screen w-screen"><Board />
      {JSON.stringify(legalMovesForSelectedPiece)}</div>
  )
}

export default App
