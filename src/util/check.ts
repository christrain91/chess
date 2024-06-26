import { getLegalMovesForPiece } from './moves/pieces/getLegalMovesForPiece'
import { Piece, Color } from '../types'

export function isInCheck(pieces: Piece[], turn: Color) {
  const king = pieces.find(piece => piece.type === 'king' && piece.color === turn)
  if (!king) {
    throw new Error('No king found')
  }
  const opponentPieces = pieces.filter(piece => piece.color !== turn)
  return opponentPieces.some(piece => getLegalMovesForPiece(piece, pieces, [], false).some(move => move.to.file === king.square.file && move.to.rank === king.square.rank))
}