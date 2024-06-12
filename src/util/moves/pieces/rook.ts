import { Piece, MoveWithoutNotation } from '../../../types';
import { calculateLegalStraightMoves } from '../straight';

export function calculateLegalRookMoves(rook: Piece, pieces: Piece[]): MoveWithoutNotation[] {
  return calculateLegalStraightMoves(rook, pieces)
  
} 