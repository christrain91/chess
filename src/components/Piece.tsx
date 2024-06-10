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
        <img src={getIconUrl(props.type, props.black)} alt={props.type} />
      </div>
    </div>
  </div>
}

function getIconUrl(type: PieceProps['type'], black: PieceProps['black']) {
  return `/icons/${getIconName(type, black)}.png`

}

function getIconName (type: PieceProps['type'], black: PieceProps['black']) {
  const color = black ? 'b' : 'w'
  switch (type) {
    case 'king':
      return `${color}k`
    case 'queen':
      return `${color}q`
    case 'rook':
      return `${color}r`
    case 'bishop':
      return `${color}b`
    case 'knight':
      return `${color}n`
    case 'pawn':
      return `${color}p`
  }
}