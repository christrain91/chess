import { Piece, Move } from '../../../types';
import { calculateLegalDiagonalMoves } from '../diagonal';
import { calculateLegalStraightMoves } from '../straight';

export function calculateLegalQueenMoves(queen: Piece, pieces: Piece[]): Move[] {
  return [...calculateLegalDiagonalMoves(queen, pieces),
    ...calculateLegalStraightMoves(queen, pieces)
  ]
} 