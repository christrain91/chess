import { Piece, Move, File, PieceType, Color } from '../../../types';
import { calculateLegalDiagonalMoves } from '../diagonal';
import { calculateLegalStraightMoves } from '../straight';
import { getLegalMovesForPiece } from './getLegalMovesForPiece';

export function calculateLegalKingMoves(king: Piece, pieces: Piece[], moveHistory: Move[]): Move[] {
  const moves: Move[] = [...calculateLegalDiagonalMoves(king, pieces, 1),
    ...calculateLegalStraightMoves(king, pieces, 1)
  ]

  if (canCastleQueenside(king, pieces, moveHistory)) {
    moves.push({
      piece: king,
      from: king.square,
      to: { file: File.C, rank: king.square.rank },
      extraMove: {
        piece: pieces.find(piece => piece.type === PieceType.ROOK && piece.color === king.color && piece.square.file === File.A && piece.square.rank === king.square.rank) as Piece,
        from: { file: File.A, rank: king.square.rank },
        to: { file: File.D, rank: king.square.rank }
      }
    })
  }

  if (canCastleKingside(king, pieces, moveHistory)) {
    moves.push({
      piece: king,
      from: king.square,
      to: { file: File.G, rank: king.square.rank },
      extraMove: {
        piece: pieces.find(piece => piece.type === PieceType.ROOK && piece.color === king.color && piece.square.file === File.H && piece.square.rank === king.square.rank) as Piece,
        from: { file: File.H, rank: king.square.rank },
        to: { file: File.F, rank: king.square.rank }
      }
    })
  }
  

  return moves
}

function canCastleKingside(king: Piece, pieces: Piece[], moveHistory: Move[]): boolean {
  if (hasKingMoved(moveHistory, king.color)) return false
  
  const hasKingsideRookMoved = moveHistory.some(move => move.piece.type === PieceType.ROOK && move.piece.color === king.color && move.from.file === File.H)
    const hasKingsideRook = pieces.find(piece => piece.type === PieceType.ROOK && piece.color === king.color && piece.square.file === File.A && piece.square.rank === king.square.rank)

  if (hasKingsideRookMoved || !hasKingsideRook) {
    return false
  }

  return allowCastle(king, [File.F, File.G], [File.F, File.G], pieces, moveHistory)

}

function canCastleQueenside(king: Piece, pieces: Piece[], moveHistory: Move[]): boolean {
  if (hasKingMoved(moveHistory, king.color)) return false

  const hasQueensideRookMoved = moveHistory.some(move => move.piece.type === PieceType.ROOK && move.piece.color === king.color && move.from.file === File.A)
  const hasQueensideRook = pieces.find(piece => piece.type === PieceType.ROOK && piece.color === king.color && piece.square.file === File.A && piece.square.rank === king.square.rank)
  

  if (hasQueensideRookMoved || !hasQueensideRook) {
    return false
  }

  return allowCastle(king, [File.C, File.D], [File.B, File.C, File.D], pieces, moveHistory)

}

function allowCastle(king: Piece, kingCastlingFiles: File[], allCastlingFiles: File[], pieces: Piece[], moveHistory: Move[]): boolean {
  const hasPiecesBetween = pieces.some(piece => (allCastlingFiles.includes(piece.square.file)) && piece.square.rank === king.square.rank)

  if (hasPiecesBetween) return false
  const enemyPieces = pieces.filter(piece => piece.color !== king.color)
  
  return !enemyPieces.some(enemyPiece => {
      const moves = getLegalMovesForPiece(enemyPiece, pieces, moveHistory, false)
      return moves.some(move => (kingCastlingFiles.includes(move.to.file) || move.to.file === king.square.file) && move.to.rank === king.square.rank)
  })

}

function hasKingMoved (moveHistory: Move[], color: Color): boolean {
  return moveHistory.some(move => move.piece.color === color && move.piece.type === PieceType.KING)
}