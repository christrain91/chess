export enum Color {
  WHITE = 'white',
  BLACK = 'black'
}

export enum PieceType {
  KING = 'king',
  QUEEN = 'queen',
  ROOK = 'rook',
  BISHOP = 'bishop',
  KNIGHT = 'knight',
  PAWN = 'pawn'
}

export interface GameState {
  turn: Color
  pieces: Piece[]
  capturedPieces: Piece[]
  inCheck: boolean
  moves: Move[]
  activePiece: Piece | null
}

export interface Move {
  from: Square
  to: Square
  piece: Piece
  capture?: Piece
  extraMove?: Move // Rook move when castling
}

export interface Square {
  rank: Rank
  file: File
}

export interface Piece {
  type: PieceType
  square: Square
  color: Color
}


export enum File {
  A = 'a',
  B = 'b',
  C = 'c',
  D = 'd',
  E = 'e',
  F = 'f',
  G = 'g',
  H = 'h'
}

export enum Rank {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  EIGHT = 8
}