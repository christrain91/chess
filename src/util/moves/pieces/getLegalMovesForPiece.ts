import { Piece, Move, MoveWithoutNotation, PieceType } from '../../../types'
import { isInCheck } from '../../check'
import { applyMoveToPieces } from './applyMoveToPieces'
import { calculateLegalBishopMoves } from './bishop'
import { calculateLegalKingMoves } from './king'
import { calculateLegalKnightMoves } from './knight'
import { calculateLegalPawnMoves } from './pawn'
import { calculateLegalQueenMoves } from './queen'
import { calculateLegalRookMoves } from './rook'

export function getLegalMovesForPiece(piece: Piece | null, pieces: Piece[], moveHistory: Move[], filterChecks: boolean): MoveWithoutNotation[] {
  if (!piece) {
    return []
  }

  let moves: MoveWithoutNotation[] = []

  switch (piece.type) {
    case PieceType.PAWN:
      moves = calculateLegalPawnMoves(piece, pieces, moveHistory[moveHistory.length - 1])
      break
    case PieceType.ROOK:
      moves = calculateLegalRookMoves(piece, pieces)
      break
    case PieceType.KNIGHT:
      moves = calculateLegalKnightMoves(piece, pieces)
      break
    case PieceType.BISHOP:
      moves = calculateLegalBishopMoves(piece, pieces)
      break
    case PieceType.QUEEN:
      moves = calculateLegalQueenMoves(piece, pieces)
      break
    case PieceType.KING:
      moves = calculateLegalKingMoves(piece, pieces, moveHistory)
      break
  }

  if (filterChecks) {
    moves = moves.filter(move => {
      const piecesAfterMove = applyMoveToPieces(pieces, move)
      return !isInCheck(piecesAfterMove, piece.color)
    })
  }

  return moves
}
