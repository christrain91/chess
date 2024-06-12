import { MoveWithoutNotation, Piece } from '../../../types'

export function applyMoveToPieces(pieces: Piece[], move: MoveWithoutNotation): Piece[] {
  return pieces.map((piece) => {
    if (!move.promotion && move.capture && piece.square.rank === move.capture.square.rank && piece.square.file === move.capture.square.file) {
      return null
    }

    // If we are promoting a piece, we need to look for the piece at the "to" square as the pawn will have already moved
    const lookForPieceAt = move.promotion ? move.to : move.from

    if (piece.square.rank === lookForPieceAt.rank && piece.square.file === lookForPieceAt.file) {
      return {
        ...piece,
        type: move.promotion || piece.type,
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