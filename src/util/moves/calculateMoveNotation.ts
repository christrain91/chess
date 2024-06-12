import { CastleType, Color, Move, MoveWithoutNotation, Piece, PieceType } from '@/types';
import { applyMoveToPieces } from './pieces/applyMoveToPieces';
import { isInCheck } from '../check';
import { isCheckmate } from '../checkmate';
import { getLegalMovesForPiece } from './pieces/getLegalMovesForPiece';

export function calculateMoveNotation(move: MoveWithoutNotation, pieces: Piece[], moveHistory: Move[]): string {
  if (move.castle) {
    return move.castle === CastleType.QUEENSIDE ? 'O-O-O' : 'O-O'
  }
  const pieceTypeNotation = getPieceTypeNotation(move.piece.type)
  const pieceTypeSpecificNotation = getSpecificPieceTypeNotation(move.piece, pieces, move, moveHistory)
  const captureNotation = move.capture ? 'x' : ''
  const promotionNotation = move.promotion ? `=${getPieceTypeNotation(move.promotion)}` : ''

  const piecesAfterMove = applyMoveToPieces(pieces, move)
  const checkOrMateNotation = getCheckOrMateNotation(piecesAfterMove, invertColor(move.piece.color), moveHistory)
    
  return [pieceTypeNotation, pieceTypeSpecificNotation, captureNotation, move.to.file, move.to.rank, promotionNotation, checkOrMateNotation].join('')
}

function getSpecificPieceTypeNotation(piece: Piece, pieces: Piece[], move: MoveWithoutNotation, moveHistory: Move[]): string {
  if (piece.type === PieceType.PAWN && move.capture) {
    return move.from.file
  }

  const sameTypePieces = pieces.filter(p => p.type === piece.type && p.color === move.piece.color)
  const piecesThatCanMoveToTargetSquare = sameTypePieces.filter(p => {
    const legalMoves = getLegalMovesForPiece(p, pieces, moveHistory, false)
    return legalMoves.some(m => m.to.file === move.to.file && m.to.rank === move.to.rank)
  })
  const sameTypePiecesOnSameFile = piecesThatCanMoveToTargetSquare.filter(p => p.square.file === move.from.file)
  const sameTypePiecesOnSameRank = piecesThatCanMoveToTargetSquare.filter(p => p.square.rank === move.from.rank)

  if (piecesThatCanMoveToTargetSquare.length === 1) {
    return ''
  }

  if (sameTypePiecesOnSameFile.length === 1) {
    return move.from.file
  }

  if (sameTypePiecesOnSameRank.length === 1) {
    return move.from.rank.toString()
  }

  return `${move.from.file}${move.from.rank.toString()}`
}

function getPieceTypeNotation(pieceType: PieceType) {
  switch (pieceType) {
    case 'rook':
      return 'R'
    case 'knight':
      return 'N'
    case 'bishop':
      return 'B'
    case 'queen':
      return 'Q'
    case 'king':
      return 'K'
  }

  return ''
}

function invertColor (color: Color): Color {
  return color === Color.WHITE ? Color.BLACK : Color.WHITE
}

function getCheckOrMateNotation(pieces: Piece[], turn: Color, moveHistory: Move[]): string {
  const isMate = isCheckmate(pieces, turn, moveHistory)

  if (isMate) {
    return '#'
  }

  return isInCheck(pieces, turn) ? '+' : ''
}