import { Move, Piece } from '../../../types'

export function applyMoveToPieces(pieces: Piece[], move: Move): Piece[] {
  return pieces.map((piece) => {
    if (piece.square.rank === move.to.rank && piece.square.file === move.to.file) {
      return null
    }
    if (piece.square.rank === move.from.rank && piece.square.file === move.from.file) {
      return {
        ...piece,
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