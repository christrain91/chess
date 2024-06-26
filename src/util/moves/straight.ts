import { MoveWithoutNotation, Piece } from '../../types'
import { getMovesInDirection } from './getMovesInDirection'

export function calculateLegalStraightMoves(piece: Piece, pieces: Piece[], squareLimit?: number): MoveWithoutNotation[] {
  const moves: MoveWithoutNotation[] = []

  moves.push(...getMovesInDirection(piece, pieces, 1, 0, squareLimit))
  moves.push(...getMovesInDirection(piece, pieces, -1, 0, squareLimit))
  moves.push(...getMovesInDirection(piece, pieces, 0, 1, squareLimit))
  moves.push(...getMovesInDirection(piece, pieces, 0, -1, squareLimit))

  return moves
}