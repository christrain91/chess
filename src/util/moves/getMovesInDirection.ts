import { MoveWithoutNotation, Piece } from '../../types'
import { convertFileToNumber, convertNumberToFile } from '../file';

export function getMovesInDirection (piece: Piece, pieces: Piece[], fileDirection: number, rankDirection: number, squareLimit?: number): MoveWithoutNotation[] {
  const moves: MoveWithoutNotation[] = []
  const currentFile = convertFileToNumber(piece.square.file)
  let nextFile = currentFile + fileDirection
  let nextRank = piece.square.rank + rankDirection

  const minFile = squareLimit ? Math.max(convertFileToNumber(piece.square.file) - squareLimit, 1) : 1
  const maxFile = squareLimit ? Math.min(convertFileToNumber(piece.square.file) + squareLimit, 8) : 8
  const minRank = squareLimit ? Math.max(piece.square.rank - squareLimit, 1) : 1
  const maxRank = squareLimit ? Math.min(piece.square.rank + squareLimit, 8) : 8

  while (nextFile >= minFile && nextFile <= maxFile && nextRank >= minRank && nextRank <= maxRank) {
    const pieceAtLocation = pieces.find((p) => convertFileToNumber(p.square.file) === nextFile && p.square.rank === nextRank)

    if (pieceAtLocation) {
      if (pieceAtLocation.color !== piece.color) {
        moves.push({ to: { file: convertNumberToFile(nextFile), rank: nextRank }, from: piece.square, piece, capture: pieceAtLocation })
      }

      break
    }

    moves.push({ to: { file: convertNumberToFile(nextFile), rank: nextRank }, from: piece.square, piece })
    nextFile += fileDirection
    nextRank += rankDirection
  }

  return moves
}

