import { getLegalMovesForPiece } from './moves/pieces/getLegalMovesForPiece'
import { Piece, Color, Move } from '../types'

export function isInCheck(pieces: Piece[], turn: Color, moveHistory: Move[]) {
  const king = pieces.find(piece => piece.type === 'king' && piece.color === turn)
  if (!king) {
    throw new Error('No king found')
  }
  const opponentPieces = pieces.filter(piece => piece.color !== turn)
  return opponentPieces.some(piece => getLegalMovesForPiece(piece, pieces, moveHistory, false).some(move => move.to.file === king.square.file && move.to.rank === king.square.rank))
}