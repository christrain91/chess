import { Piece, Move, Color } from '../types';
import { isInCheck } from './check';
import { getLegalMovesForPiece } from './moves/pieces/getLegalMovesForPiece';

export function isStalemate(pieces: Piece[], turn: Color, moveHistory: Move[]) {
  const inCheck = isInCheck(pieces, turn)

  if (inCheck) return false

  const ourPieces = pieces.filter(piece => piece.color === turn)
  const legalMoves = ourPieces.flatMap(piece => getLegalMovesForPiece(piece, pieces, moveHistory, false))

  return legalMoves.length === 0
  
}