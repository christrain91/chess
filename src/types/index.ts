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
  inCheck: boolean
  moves: Move[]
  activePiece: Piece | null
}

export interface Move {
  from: Square
  to: Square
  piece: Piece
  capture?: Piece
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

export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type File = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'