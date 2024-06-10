import { create } from 'zustand'
import { File,GameState, Square, Piece, Color, PieceType, Move } from '../types'
import { getLegalMovesForPiece } from '../util/moves/pieces/getLegalMovesForPiece'
import { applyMoveToPieces } from '../util/moves/pieces/applyMoveToPieces';

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


export const useGameStateStore = create<GameStateStore>((set, get) => ({
  ...initialGameState,
  legalMovesForSelectedPiece: [],
  getPieceForSquare: (square: Square): Piece | undefined => {
    return get().pieces.find(piece => piece.square.rank === square.rank && piece.square.file === square.file)
  },
  setActivePiece: (piece: Piece | null) => {
    const isPiecesTurn = piece && piece.color === get().turn

    const { pieces, moves } = get()
    const legalMoves = isPiecesTurn ? getLegalMovesForPiece(piece, pieces, moves, true) : []
    set({
      activePiece: isPiecesTurn ? piece || null : null,
      legalMovesForSelectedPiece: legalMoves
    })
  },
  makeMove: (move: Move) => {
    const pieces = applyMoveToPieces(get().pieces, move)

    set({
      capturedPieces: move.capture ? [...get().capturedPieces, move.capture] : get().capturedPieces,
      pieces,
      moves: get().moves.concat([move]),
      activePiece: null,
      turn: get().turn === Color.WHITE ? Color.BLACK : Color.WHITE,
      legalMovesForSelectedPiece: []
    })
  }
}))



