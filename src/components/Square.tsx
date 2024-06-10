import { useGameStateStore } from '../stores/GameStateStore'
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
  const setActivePiece = useGameStateStore((state) => state.setActivePiece)
  
  return <div className={`${props.black ? 'bg-sky-700' : 'bg-sky-100'} w-full h-full aspect-square pt-[1px] pl-[1px] pr-[2px]`}>
      <div className={`relative w-full h-full text-xs md:text-sm lg:text-lg xl:text-2xl font-semibold ${props.black ? 'text-sky-100' : 'text-sky-700'}`}>
      {showRank && <div className="absolute top-0 left-0 ">{props.rank}</div>}
      {showFile && <div className="absolute bottom-0 right-0 ">{props.file}</div>}
      <div className="absolute w-full h-full items-center justify-center flex p-1">
        {piece && <Piece onClick={() => setActivePiece(piece)} type={piece.type} rank={props.rank} file={props.file} black={piece.color === 'black'}/>}


      </div>
      </div>
  </div>
}