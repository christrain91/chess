import { PieceType, type Move, type MoveWithoutNotation, type Piece, type Rank, type Square, type File } from '../../../types';
import { getNextFile, getPreviousFile } from '../../file';

export function calculateLegalPawnMoves(pawn: Piece, pieces: Piece[], lastMove: Move | null): MoveWithoutNotation[] {
  let moves: MoveWithoutNotation[] = []

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

function calculateCaptures(pawn: Piece, pieces: Piece[], lastMove: Move | null) {
  const captures: MoveWithoutNotation[] = [] 

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

  if (lastMove) {

    const enpassantCapture = getEnPassantCapture(pawn, [previousFile, nextFile].filter(Boolean) as File[], lastMove)

    if (enpassantCapture) {
      captures.push(enpassantCapture)
    }
  }

  return captures
}

function getEnPassantCapture (pawn: Piece, files: File[], lastMove: Move ): MoveWithoutNotation | null {
  if (lastMove.piece.color === pawn.color || !files.includes(lastMove.piece.square.file)) return null

  const wasLastMoveAPawnDoubleMove = lastMove.piece.type === PieceType.PAWN && Math.abs(lastMove.from.rank - lastMove.to.rank) === 2

  if (!wasLastMoveAPawnDoubleMove) return null


  const allowCapture = lastMove.to.rank === pawn.square.rank

  if (!allowCapture) return null

  return {
    from: pawn.square,
    to: { rank: pawn.square.rank + (pawn.color === 'white' ? 1 : -1) as Rank, file: lastMove.piece.square.file },
    piece: pawn,
    capture: { ...lastMove.piece, square: lastMove.to }
  }
}