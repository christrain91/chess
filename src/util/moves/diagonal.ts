import { MoveWithoutNotation, Piece } from '../../types'
import { getMovesInDirection } from './getMovesInDirection'

export function calculateLegalDiagonalMoves(piece: Piece, pieces: Piece[], squareLimit?: number): MoveWithoutNotation[] {
  const moves: MoveWithoutNotation[] = []

  moves.push(...getMovesInDirection(piece, pieces, 1, 1, squareLimit))
  moves.push(...getMovesInDirection(piece, pieces, 1, -1, squareLimit))
  moves.push(...getMovesInDirection(piece, pieces, -1, 1, squareLimit))
  moves.push(...getMovesInDirection(piece, pieces, -1, -1, squareLimit))

  return moves
}