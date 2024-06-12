import { Piece, MoveWithoutNotation, Rank } from '../../../types';
import { convertFileToNumber, convertNumberToFile } from '../../file';

export function calculateLegalKnightMoves(knight: Piece, pieces: Piece[]): MoveWithoutNotation[] {
  const moves: MoveWithoutNotation[] = []
  const fileAsNumber = convertFileToNumber(knight.square.file)
  const rank = knight.square.rank

  const possibleMoves = [
    { file: fileAsNumber + 1, rank: rank + 2 },
    { file: fileAsNumber + 1, rank: rank - 2 },
    { file: fileAsNumber - 1, rank: rank + 2 },
    { file: fileAsNumber - 1, rank: rank - 2 },
    { file: fileAsNumber + 2, rank: rank + 1 },
    { file: fileAsNumber + 2, rank: rank - 1 },
    { file: fileAsNumber - 2, rank: rank + 1 },
    { file: fileAsNumber - 2, rank: rank - 1 }
  ]

  for (const possibleMove of possibleMoves) {
    const file = convertNumberToFile(possibleMove.file)
    const piece = pieces.find(p => p.square.file === file && p.square.rank === possibleMove.rank)

    if (possibleMove.rank >= 1 && possibleMove.rank <= 8 && possibleMove.file >= 1 && possibleMove.file <= 8) {
      const newMove: MoveWithoutNotation = {
        piece: knight,
        to: { file, rank: possibleMove.rank as Rank },
        from: knight.square
      }
      
      if (piece) {
        if (piece.color !== knight.color) {
          moves.push({ ...newMove, capture: piece })
        }
      } else {
        moves.push(newMove)
      }
    }
  }

  return moves
}