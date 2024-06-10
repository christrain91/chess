import { create } from 'zustand'
import { GameState, Square, Piece, Color, PieceType, Move } from '../types'
import { calculateLegalPawnMoves } from '../util/moves/pieces/pawn'
import { calculateLegalBishopMoves } from '../util/moves/pieces/bishop'
import { calculateLegalKingMoves } from '../util/moves/pieces/king'
import { calculateLegalKnightMoves } from '../util/moves/pieces/knight'
import { calculateLegalQueenMoves } from '../util/moves/pieces/queen'
import { calculateLegalRookMoves } from '../util/moves/pieces/rook'

interface GameStateStore extends GameState {
  setActivePiece: (piece: Piece | null) => void
  getPieceForSquare: (square: Square) => Piece | undefined
  legalMovesForSelectedPiece: Move[]
  makeMove: (move: Move) => void
}

const initialGameState: GameState = {
  turn: Color.WHITE,
  inCheck: false,
  activePiece: null,
  capturedPieces: [],
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
  setActivePiece: (piece: Piece | null) => {
    const { pieces, moves } = get()
    const legalMoves = getLegalMovesForPiece(piece, pieces, moves)
    set({
      activePiece: piece || null,
      legalMovesForSelectedPiece: legalMoves
    })
  },
  makeMove: (move: Move) => {
    const pieces = get().pieces.map((piece) => {
      if (piece.square.rank === move.to.rank && piece.square.file === move.to.file) {
        return null
      }
      if (piece.square.rank === move.from.rank && piece.square.file === move.from.file) {
        return {
          ...piece,
          square: move.to
        }
      }
      return piece
    }).filter(Boolean) as Piece[]

    set({
      capturedPieces: move.capture ? [...get().capturedPieces, move.capture] : get().capturedPieces,
      pieces,
      moves: [...get().moves, move],
      activePiece: null,
      legalMovesForSelectedPiece: []
    })
  }
}))


function getLegalMovesForPiece(piece: Piece | null, pieces: Piece[], moveHistory: Move[]): Move[] {
    if (!piece) {
      return []
    }
    switch (piece.type) {
      case PieceType.PAWN:
        return calculateLegalPawnMoves(piece, pieces, moveHistory[moveHistory.length - 1])
      default:
        return []
      case PieceType.ROOK:
        return calculateLegalRookMoves(piece, pieces)
      case PieceType.KNIGHT:
        return calculateLegalKnightMoves(piece, pieces)
      case PieceType.BISHOP:
        return calculateLegalBishopMoves(piece, pieces)
      case PieceType.QUEEN:
        return calculateLegalQueenMoves(piece, pieces)
      case PieceType.KING:
        return calculateLegalKingMoves(piece, pieces, moveHistory)
    }
  }

