import { Piece, Move } from '../../../types';
import { calculateLegalDiagonalMoves } from '../diagonal';
import { calculateLegalStraightMoves } from '../straight';

export function calculateLegalKingMoves(king: Piece, pieces: Piece[], _moveHistory: Move[]): Move[] {
  // TODO: Castling

  return [...calculateLegalDiagonalMoves(king, pieces, 1),
    ...calculateLegalStraightMoves(king, pieces, 1)
  ]
} 