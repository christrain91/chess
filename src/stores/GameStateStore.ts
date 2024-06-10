import { create } from 'zustand'
import { GameState, Square, Piece, Color, PieceType, Move } from '../types'
import { calculateLegalPawnMoves } from '../util/moves/pawn'

interface GameStateStore extends GameState {
  setActivePiece: (piece: Piece) => void
  getPieceForSquare: (square: Square) => Piece | undefined
  legalMovesForSelectedPiece: Move[]
}

const initialGameState: GameState = {
  turn: Color.WHITE,
  inCheck: false,
  activePiece: null,
  moves: [],
  pieces:  [
    {
      type: PieceType.ROOK,
      square: { rank: 1, file: 'a' },
      color: Color.WHITE
    },
    {
      type: PieceType.KNIGHT,
      square: { rank: 1, file: 'b' },
      color: Color.WHITE
    },
    {
      type: PieceType.BISHOP,
      square: { rank: 1, file: 'c' },
      color: Color.WHITE
    },
    {
      type: PieceType.QUEEN,
      square: { rank: 1, file: 'd' },
      color: Color.WHITE
    },
    {
      type: PieceType.KING,
      square: { rank: 1, file: 'e' },
      color: Color.WHITE
    },
    {
      type: PieceType.BISHOP,
      square: { rank: 1, file: 'f' },
      color: Color.WHITE
    },
    {
      type: PieceType.KNIGHT,
      square: { rank: 1, file: 'g' },
      color: Color.WHITE
    },
    {
      type: PieceType.ROOK,
      square: { rank: 1, file: 'h' },
      color: Color.WHITE
    },
    {
      type: PieceType.PAWN,
      square: { rank: 2, file: 'a' },
      color: Color.WHITE
    },
    {
      type: PieceType.PAWN,
      square: { rank: 2, file: 'b' },
      color: Color.WHITE
    },
    {
      type: PieceType.PAWN,
      square: { rank: 2, file: 'c' },
      color: Color.WHITE
    },
    {
      type: PieceType.PAWN,
      square: { rank: 2, file: 'd' },
      color: Color.WHITE
    },
    {
      type: PieceType.PAWN,
      square: { rank: 2, file: 'e' },
      color: Color.WHITE
    },
    {
      type: PieceType.PAWN,
      square: { rank: 2, file: 'f' },
      color: Color.WHITE
    },
    {
      type: PieceType.PAWN,
      square: { rank: 2, file: 'g' },
      color: Color.WHITE
    },
    {
      type: PieceType.PAWN,
      square: { rank: 2, file: 'h' },
      color: Color.WHITE
    },
    {
      type: PieceType.ROOK,
      square: { rank: 8, file: 'a' },
      color: Color.BLACK
    },
    {
      type: PieceType.KNIGHT,
      square: { rank: 8, file: 'b' },
      color: Color.BLACK
    },
    {
      type: PieceType.BISHOP,
      square: { rank: 8, file: 'c' },
      color: Color.BLACK
    },
    {
      type: PieceType.QUEEN,
      square: { rank: 8, file: 'd' },
      color: Color.BLACK
    },
    {
      type: PieceType.KING,
      square: { rank: 8, file: 'e' },
      color: Color.BLACK
    },
    {
      type: PieceType.BISHOP,
      square: { rank: 8, file: 'f' },
      color: Color.BLACK
    },
    {
      type: PieceType.KNIGHT,
      square: { rank: 8, file: 'g' },
      color: Color.BLACK
    },
    {
      type: PieceType.ROOK,
      square: { rank: 8, file: 'h' },
      color: Color.BLACK
    },
    {
      type: PieceType.PAWN,
      square: { rank: 7, file: 'a' },
      color: Color.BLACK
    },
    {
      type: PieceType.PAWN,
      square: { rank: 7, file: 'b' },
      color: Color.BLACK
    },
    {
      type: PieceType.PAWN,
      square: { rank: 7, file: 'c' },
      color: Color.BLACK
    },
    {
      type: PieceType.PAWN,
      square: { rank: 7, file: 'd' },
      color: Color.BLACK
    },
    {
      type: PieceType.PAWN,
      square: { rank: 7, file: 'e' },
      color: Color.BLACK
    },
    {
      type: PieceType.PAWN,
      square: { rank: 7, file: 'f' },
      color: Color.BLACK
    },
    {
      type: PieceType.PAWN,
      square: { rank: 7, file: 'g' },
      color: Color.BLACK
    },
    {
      type: PieceType.PAWN,
      square: { rank: 7, file: 'h' },
      color: Color.BLACK
    }
  ]
}


export const useGameStateStore = create<GameStateStore>((set, get) => ({
  ...initialGameState,
  legalMovesForSelectedPiece: [],
  getPieceForSquare: (square: Square): Piece | undefined => {
    return get().pieces.find(piece => piece.square.rank === square.rank && piece.square.file === square.file)
  },
  setActivePiece: (piece: Piece | undefined) => {
    console.log('setting active piece', piece)
    const legalMoves = getLegalMovesForPiece(piece, get().pieces)
    console.log('legal moves', legalMoves)
    set({
      activePiece: piece || null,
      legalMovesForSelectedPiece: legalMoves
    })
  }
}))


function getLegalMovesForPiece(piece: Piece | undefined, pieces: Piece[]): Move[] {
      if (!piece) {
      return []
    }
    switch (piece.type) {
      case PieceType.PAWN:
        return calculateLegalPawnMoves(piece, pieces)
      default:
        return []
      // case PieceType.ROOK:
      //   return calculateLegalRookMoves(piece, get().pieces)
      // case PieceType.KNIGHT:
      //   return calculateLegalKnightMoves(piece, get().pieces)
      // case PieceType.BISHOP:
      //   return calculateLegalBishopMoves(piece, get().pieces)
      // case PieceType.QUEEN:
      //   return calculateLegalQueenMoves(piece, get().pieces)
      // case PieceType.KING:
      //   return calculateLegalKingMoves(piece, get().pieces)
    }
  }

