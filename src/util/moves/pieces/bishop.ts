import { Piece } from '../../../types';
import { calculateLegalDiagonalMoves } from '../diagonal';

export function calculateLegalBishopMoves(bishop: Piece, pieces: Piece[]) {
  return calculateLegalDiagonalMoves(bishop, pieces)
}