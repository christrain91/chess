import { useGameStateStore } from '../stores/GameStateStore';
import type { Rank, File } from '../types'
import { Piece } from './Piece'

interface SquareProps {
  className?: string
  rank: Rank
  file: File
  black: boolean
}

export function Square(props: SquareProps) {
  const showRank = props.file === 'a'
  const showFile = props.rank === 1
  
  const piece = useGameStateStore((state) => state.getPieceForSquare({ rank: props.rank, file: props.file }))
  const selectedPiece = useGameStateStore((state) => state.activePiece)
  const legalMovesForSelectedPiece = useGameStateStore((state) => state.legalMovesForSelectedPiece)
  const setActivePiece = useGameStateStore((state) => state.setActivePiece)
  const makeMove = useGameStateStore((state) => state.makeMove)

  const matchingLegalMove = legalMovesForSelectedPiece.find((move) => move.to.rank === props.rank && move.to.file === props.file)
  const isSelected = selectedPiece && selectedPiece.square.rank === props.rank && selectedPiece.square.file === props.file
  
  return <div className={`group ${isSelected ? 'bg-yellow-500' : props.black ? 'bg-sky-700' : 'bg-sky-100'} w-full h-full aspect-square pt-[1px] pl-[1px] pr-[2px]`}>
      <div className={`relative w-full h-full text-xs md:text-sm lg:text-lg xl:text-2xl font-semibold ${props.black ? 'text-sky-100' : 'text-sky-700'}`}>
      {showRank && <div className="absolute top-0 left-0 ">{props.rank}</div>}
      {showFile && <div className="absolute bottom-0 right-0 ">{props.file}</div>}
      <div className="absolute w-full h-full items-center justify-center flex p-1">
        {piece && <Piece onClick={() => isSelected ? setActivePiece(null) : setActivePiece(piece)} type={piece.type} rank={props.rank} file={props.file} black={piece.color === 'black'}/>}
      </div>
      {matchingLegalMove && <div onClick={() => makeMove(matchingLegalMove)} className="cursor-pointer absolute w-full h-full p-1 flex items-center justify-center">
        {matchingLegalMove.capture ?
          <span className={`rounded-full aspect-square w-full z-20 border-8 hover:border-red-500 border-red-500/80 p-2 `} /> :
          <span className={`rounded-full aspect-square w-1/4 group-hover:bg-yellow-500 ${props.black ? 'bg-slate-200' : 'bg-slate-400'} bg-opacity-50`} />
        }
      </div>
      }
      </div>
  </div>
}