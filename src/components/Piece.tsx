import { PieceType } from '@/types'

interface PieceProps {
  onClick?: () => void
  type: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'
  rank: number
  file: string
  black: boolean
}

export function Piece(props: PieceProps) {
  return <div onClick={props.onClick} className="z-10 cursor-pointer w-full h-full aspect-square">
    <div className="relative w-full h-full">
      <div className="absolute w-full h-full items-center justify-center flex">
        <img className="w-full h-full" src={getIconUrl(props.type, props.black)} alt={props.type} />
      </div>
    </div>
  </div>
}

function getIconUrl(type: PieceProps['type'], black: PieceProps['black']) {
  return `/icons/${getIconName(type, black)}.png`

}

function getIconName(type: PieceProps['type'], black: PieceProps['black']) {
  const color = black ? 'b' : 'w'
  switch (type) {
    case PieceType.KING:
      return `${color}k`
    case PieceType.QUEEN:
      return `${color}q`
    case PieceType.ROOK:
      return `${color}r`
    case PieceType.BISHOP:
      return `${color}b`
    case PieceType.KNIGHT:
      return `${color}n`
    case PieceType.PAWN:
      return `${color}p`
  }
}