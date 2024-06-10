import type { Move, Piece, Rank, Square } from '../../types';

export function calculateLegalPawnMoves(pawn: Piece, pieces: Piece[]): Move[] {
  const moves: Move[] = []

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

  return moves
}

function isPieceAtPosition(pieces: Piece[], square: Square) {
  return pieces.find((piece) => piece.square.rank === square.rank && piece.square.file === square.file)
  
}