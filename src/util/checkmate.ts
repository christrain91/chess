import { Piece, Color, Move } from '../types'
import { isInCheck } from './check'
import { getLegalMovesForPiece } from './moves/pieces/getLegalMovesForPiece'

export function isCheckmate(pieces: Piece[], turn: Color, moveHistory: Move[]): boolean {
  const king = pieces.find(piece => piece.type === 'king' && piece.color === turn)
  if (!king) {
    throw new Error('No king found')
  }
  const inCheck = isInCheck(pieces, turn)

  if (!inCheck) {
    return false
  }

  const ourPieces = pieces.filter(piece => piece.color === turn)
  const legalMoves = ourPieces.flatMap(piece => getLegalMovesForPiece(piece, pieces, moveHistory, true))
  
  return legalMoves.length === 0
}