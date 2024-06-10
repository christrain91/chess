import { Piece, Move } from '../../../types';
import { calculateLegalStraightMoves } from '../straight';

export function calculateLegalRookMoves(rook: Piece, pieces: Piece[]): Move[] {
  return calculateLegalStraightMoves(rook, pieces)
  
} 