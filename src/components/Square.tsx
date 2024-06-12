import { cn } from '@/lib/utils';
import { useGameStateStore } from '../stores/GameStateStore';
import { type Rank, type File, PromotionPieceType } from '../types'
import { Piece } from './Piece'
import { PromotionSelector } from './PromotionSelector';

interface SquareProps {
  className?: string
  rank: Rank
  file: File
  black: boolean
  invertedBoard: boolean
}

export function Square(props: SquareProps) {
  const showRank = props.file === 'a'
  const showFile = props.rank === (props.invertedBoard ? 8 : 1)

  const piece = useGameStateStore((state) => state.getPieceForSquare({ rank: props.rank, file: props.file }))
  const selectedPiece = useGameStateStore((state) => state.activePiece)
  const legalMovesForSelectedPiece = useGameStateStore((state) => state.legalMovesForSelectedPiece)
  const setActivePiece = useGameStateStore((state) => state.setActivePiece)
  const makeMove = useGameStateStore((state) => state.makeMove)
  const promotePiece = useGameStateStore((state) => state.promotePiece)

  const matchingLegalMove = legalMovesForSelectedPiece.find((move) => move.to.rank === props.rank && move.to.file === props.file)
  const isSelected = selectedPiece && selectedPiece.square.rank === props.rank && selectedPiece.square.file === props.file

  return <div className={cn('group  w-full h-full aspect-square pt-[1px] pl-[1px] pr-[2px]', isSelected ? 'bg-yellow-500' : props.black ? 'bg-sky-700' : 'bg-sky-100')}>
    <div className={`relative w-full h-full text-xs md:text-sm lg:text-lg xl:text-2xl font-semibold ${props.black ? 'text-sky-100' : 'text-sky-700'}`}>
      {showRank && <div className="absolute top-0 left-0 ">{props.rank}</div>}
      {showFile && <div className="absolute bottom-0 right-0 ">{props.file}</div>}
      <div className="absolute w-full h-full items-center justify-center flex p-1">
        {piece && <Piece onClick={() => isSelected ? setActivePiece(null) : setActivePiece(piece)} type={piece.type} rank={props.rank} file={props.file} black={piece.color === 'black'} />}
        {piece && piece.promoting && <PromotionSelector open={true} onSelect={(pieceType: PromotionPieceType) => promotePiece(piece, pieceType)} color={piece.color} />}
      </div>
      {matchingLegalMove && <div onClick={() => makeMove(matchingLegalMove)} className="cursor-pointer absolute w-full h-full p-1 flex items-center justify-center">
        {matchingLegalMove.capture ?
          <span className='rounded-full aspect-square w-full z-20 border-8 hover:border-red-500 border-red-500/80 p-2' /> :
          <span className={cn('rounded-full aspect-square w-1/4 group-hover:bg-yellow-500 bg-opacity-50', props.black ? 'bg-slate-200' : 'bg-slate-400')} />
        }
      </div>
      }
    </div>
  </div>
}