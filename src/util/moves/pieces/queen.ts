import { Piece, MoveWithoutNotation } from '../../../types';
import { calculateLegalDiagonalMoves } from '../diagonal';
import { calculateLegalStraightMoves } from '../straight';

export function calculateLegalQueenMoves(queen: Piece, pieces: Piece[]): MoveWithoutNotation[] {
  return [...calculateLegalDiagonalMoves(queen, pieces),
    ...calculateLegalStraightMoves(queen, pieces)
  ]
} 