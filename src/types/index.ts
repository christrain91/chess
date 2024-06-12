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

export type PromotionPieceType = PieceType.QUEEN | PieceType.ROOK | PieceType.BISHOP | PieceType.KNIGHT

export interface GameState {
  turn: Color
  pieces: Piece[]
  capturedPieces: Piece[]
  inCheck: boolean
  moves: Move[]
  activePiece: Piece | null
  result: Result | null
}

export interface Result {
  type: ResultType
  reason: string
  winner: Color | null
}

export enum ResultType {
  CHECKMATE = 'checkmate',
  STALEMATE = 'stalemate',
  RESIGNATION = 'resignation',
  DRAW = 'draw'
}

export interface Move {
  from: Square
  to: Square
  piece: Piece
  notation: string
  castle?: CastleType
  capture?: Piece
  promotion?: PromotionPieceType
  extraMove?:Omit<Move, 'notation'> // Rook move when castling
}

export type MoveWithoutNotation = Omit<Move, 'notation'>

export interface Square {
  rank: Rank
  file: File
}

export interface Piece {
  type: PieceType
  square: Square
  color: Color
  promoting?: boolean
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

export enum CastleType {
  QUEENSIDE = 'queenside',
  KINGSIDE = 'kingside'
}