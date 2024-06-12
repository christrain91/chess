import { MoveWithoutNotation, Piece } from '../../../types'

export function applyMoveToPieces(pieces: Piece[], move: MoveWithoutNotation): Piece[] {
  return pieces.map((piece) => {
    if (move.capture && piece.square.rank === move.capture.square.rank && piece.square.file === move.capture.square.file) {
      return null
    }
    if (piece.square.rank === move.from.rank && piece.square.file === move.from.file) {
      return {
        ...piece,
        promoting: isPromotion(move),
        square: move.to
      }
    }
    // Move the rook if it's a castling move
    if (move.extraMove) {
      if (piece.square.rank === move.extraMove.piece.square.rank && piece.square.file === move.extraMove.piece.square.file) {
        return {
          ...piece,
          square: move.extraMove.to
        }
      }
    }


    return piece
  }).filter(Boolean) as Piece[]
}

function isPromotion(move: MoveWithoutNotation): boolean {
  return move.piece.type === 'pawn' && (move.to.rank === 1 || move.to.rank === 8)
}