import type { Move, Piece, Rank, Square } from '../../../types';
import { getNextFile, getPreviousFile } from '../../file';

export function calculateLegalPawnMoves(pawn: Piece, pieces: Piece[], lastMove: Move | null): Move[] {
  let moves: Move[] = []

  const direction = pawn.color === 'white' ? 1 : -1

  const pieceInFront = isPieceAtPosition(pieces, { rank: (pawn.square.rank + direction) as Rank, file: pawn.square.file })
  const startingRank = pawn.color === 'white' ? 2 : 7
  
  if (!pieceInFront) {
    moves.push({
      from: pawn.square,
      to: { rank: (pawn.square.rank + direction) as Rank, file: pawn.square.file },
      piece: pawn
    })


    // Allow moving two squares if pawn is on starting rank
    if (pawn.square.rank === startingRank) {
      const pieceTwoInFront = isPieceAtPosition(pieces, { rank: (pawn.square.rank + (2 * direction)) as Rank, file: pawn.square.file })
      if (!pieceTwoInFront) {
        moves.push({
          from: pawn.square,
          to: { rank: (pawn.square.rank + 2 * direction) as Rank, file: pawn.square.file },
          piece: pawn
        })
      }
    }
  }

  moves = moves.concat(calculateCaptures(pawn, pieces, lastMove))

  return moves
}

function isPieceAtPosition(pieces: Piece[], square: Square) {
  return pieces.find((piece) => piece.square.rank === square.rank && piece.square.file === square.file)
}

function calculateCaptures(pawn: Piece, pieces: Piece[], _lastMove: Move | null) {
  const captures: Move[] = [] 

  const direction = pawn.color === 'white' ? 1 : -1
  const previousFile = getPreviousFile(pawn.square.file)
  const nextFile = getNextFile(pawn.square.file)
  const enemyPieces = pieces.filter((piece) => piece.color !== pawn.color)

  const leftCapture = previousFile ? isPieceAtPosition(enemyPieces, { rank: pawn.square.rank + direction as Rank, file: previousFile }) : null
  const rightCapture = nextFile ? isPieceAtPosition(enemyPieces, { rank: pawn.square.rank + direction as Rank, file: nextFile }) : null

  if (leftCapture) {
    captures.push({
      from: pawn.square,
      to: leftCapture.square,
      piece: pawn,
      capture: leftCapture
    })
  }
  if (rightCapture) {
    captures.push({
      from: pawn.square,
      to: rightCapture.square,
      piece: pawn,
      capture: rightCapture
    })
  }

  // TODO: En passant

  return captures

}