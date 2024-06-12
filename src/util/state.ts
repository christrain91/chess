import { GameState, Color, PieceType, File } from '../types';

export const initialGameState: GameState = {
  turn: Color.WHITE,
  inCheck: false,
  result: null,
  activePiece: null,
  capturedPieces: [],
  moves: [],
  pieces:  [
    {
      type: PieceType.ROOK,
      square: { rank: 1, file: File.A },
      color: Color.WHITE
    },
    {
      type: PieceType.KNIGHT,
      square: { rank: 1, file: File.B },
      color: Color.WHITE
    },
    {
      type: PieceType.BISHOP,
      square: { rank: 1, file: File.C },
      color: Color.WHITE
    },
    {
      type: PieceType.QUEEN,
      square: { rank: 1, file: File.D },
      color: Color.WHITE
    },
    {
      type: PieceType.KING,
      square: { rank: 1, file: File.E },
      color: Color.WHITE
    },
    {
      type: PieceType.BISHOP,
      square: { rank: 1, file: File.F },
      color: Color.WHITE
    },
    {
      type: PieceType.KNIGHT,
      square: { rank: 1, file: File.G },
      color: Color.WHITE
    },
    {
      type: PieceType.ROOK,
      square: { rank: 1, file: File.H },
      color: Color.WHITE
    },
    {
      type: PieceType.PAWN,
      square: { rank: 2, file: File.A },
      color: Color.WHITE
    },
    {
      type: PieceType.PAWN,
      square: { rank: 2, file: File.B },
      color: Color.WHITE
    },
    {
      type: PieceType.PAWN,
      square: { rank: 2, file: File.C },
      color: Color.WHITE
    },
    {
      type: PieceType.PAWN,
      square: { rank: 2, file: File.D },
      color: Color.WHITE
    },
    {
      type: PieceType.PAWN,
      square: { rank: 2, file: File.E },
      color: Color.WHITE
    },
    {
      type: PieceType.PAWN,
      square: { rank: 2, file: File.F },
      color: Color.WHITE
    },
    {
      type: PieceType.PAWN,
      square: { rank: 2, file: File.G },
      color: Color.WHITE
    },
    {
      type: PieceType.PAWN,
      square: { rank: 2, file: File.H },
      color: Color.WHITE
    },
    {
      type: PieceType.ROOK,
      square: { rank: 8, file: File.A },
      color: Color.BLACK
    },
    {
      type: PieceType.KNIGHT,
      square: { rank: 8, file: File.B },
      color: Color.BLACK
    },
    {
      type: PieceType.BISHOP,
      square: { rank: 8, file: File.C },
      color: Color.BLACK
    },
    {
      type: PieceType.QUEEN,
      square: { rank: 8, file: File.D },
      color: Color.BLACK
    },
    {
      type: PieceType.KING,
      square: { rank: 8, file: File.E },
      color: Color.BLACK
    },
    {
      type: PieceType.BISHOP,
      square: { rank: 8, file: File.F },
      color: Color.BLACK
    },
    {
      type: PieceType.KNIGHT,
      square: { rank: 8, file: File.G },
      color: Color.BLACK
    },
    {
      type: PieceType.ROOK,
      square: { rank: 8, file: File.H },
      color: Color.BLACK
    },
    {
      type: PieceType.PAWN,
      square: { rank: 7, file: File.A },
      color: Color.BLACK
    },
    {
      type: PieceType.PAWN,
      square: { rank: 7, file: File.B },
      color: Color.BLACK
    },
    {
      type: PieceType.PAWN,
      square: { rank: 7, file: File.C },
      color: Color.BLACK
    },
    {
      type: PieceType.PAWN,
      square: { rank: 7, file: File.D },
      color: Color.BLACK
    },
    {
      type: PieceType.PAWN,
      square: { rank: 7, file: File.E },
      color: Color.BLACK
    },
    {
      type: PieceType.PAWN,
      square: { rank: 7, file: File.F },
      color: Color.BLACK
    },
    {
      type: PieceType.PAWN,
      square: { rank: 7, file: File.G },
      color: Color.BLACK
    },
    {
      type: PieceType.PAWN,
      square: { rank: 7, file: File.H },
      color: Color.BLACK
    }
  ]
}
