import { create } from 'zustand'
import { GameState, Square, Piece, Color, Move, Result, ResultType, PieceType, PromotionPieceType, MoveWithoutNotation } from '../types'
import { getLegalMovesForPiece } from '../util/moves/pieces/getLegalMovesForPiece'
import { applyMoveToPieces } from '../util/moves/pieces/applyMoveToPieces';
import { isCheckmate } from '../util/checkmate';
import { isStalemate } from '../util/stalemate';
import { isDrawByInsufficientMaterial } from '../util/draw';
import { initialGameState } from '../util/state';
import { calculateMoveNotation } from '@/util/moves/calculateMoveNotation';

interface GameStateStore extends GameState {
  setActivePiece: (piece: Piece | null) => void
  promotePiece: (piece: Piece, promotionType: PromotionPieceType) => void
  getPieceForSquare: (square: Square) => Piece | undefined
  legalMovesForSelectedPiece: MoveWithoutNotation[]
  makeMove: (move: MoveWithoutNotation) => void
  pendingPromotionMove?: MoveWithoutNotation | null
}



export const useGameStateStore = create<GameStateStore>((set, get) => ({
  ...initialGameState,
  legalMovesForSelectedPiece: [],
  getPieceForSquare: (square: Square): Piece | undefined => {
    return get().pieces.find(piece => piece.square.rank === square.rank && piece.square.file === square.file)
  },
  promotePiece: (piece: Piece, promotionType: PromotionPieceType) => {
    const { pendingPromotionMove, pieces: piecesBefore, moves} = get()
    if (piece.type !== PieceType.PAWN || !pendingPromotionMove) return
    const promotionMove: MoveWithoutNotation = {
        ...pendingPromotionMove,
        promotion: promotionType
    }

    const updatedPieces = piecesBefore.map(p => {
        if (p.square.file === piece.square.file && p.square.rank === piece.square.rank && p.type === PieceType.PAWN) {
          return {
            ...p,
            promoting: false,
            type: promotionType
          }
        }
        return p
      })
    
    set({
      activePiece: null,
      turn: get().turn === Color.WHITE ? Color.BLACK : Color.WHITE,
      moves: get().moves.concat([{...promotionMove, notation: calculateMoveNotation(promotionMove, piecesBefore, moves.concat([promotionMove as Move]))}]),
      pieces: updatedPieces
    })
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
  makeMove: (move: MoveWithoutNotation) => {
    const { result: gameResult, pieces: piecesBeforeMove, moves, turn: currentTurn} = get()
    if (gameResult) return

    const piecesAfterMove = applyMoveToPieces(piecesBeforeMove, move)
    const isPromoting = !!piecesAfterMove.find(piece => piece.promoting) && !move.promotion
    const moveHistory = moves.concat([move as Move])
    const nextTurn = currentTurn === Color.WHITE ? Color.BLACK : Color.WHITE
    

    const result = checkIfGameFinished(piecesAfterMove, nextTurn, moveHistory)
    const notation = calculateMoveNotation(move, piecesBeforeMove, moveHistory)

    set({
      capturedPieces: move.capture ? [...get().capturedPieces, move.capture] : get().capturedPieces,
      pieces: piecesAfterMove,
      pendingPromotionMove: isPromoting ? move : null,
      moves: isPromoting ? moves : moves.concat([{ ...move, notation }]),
      activePiece: null,
      turn: isPromoting ? currentTurn : nextTurn,
      result,
      legalMovesForSelectedPiece: []
    })
  }
}))

function checkIfGameFinished(pieces: Piece[], turn: Color, moveHistory: Move[]): Result | null {
  if ( isCheckmate(pieces, turn, moveHistory)) {
    return {
      type: ResultType.CHECKMATE,
      reason: `${turn} is in checkmate!`,
      winner: turn === Color.WHITE ? Color.BLACK : Color.WHITE
    }
  }

  if (isStalemate(pieces, turn, moveHistory)) {
    return {
      type: ResultType.STALEMATE,
      reason: `${turn} has no legal moves available. Stalemate!`,
      winner: null
    }
  }

  if (isDrawByInsufficientMaterial(pieces)) {
    return {
      type: ResultType.DRAW,
      reason: 'Draw by insufficient material',
      winner: null
    }
  }

  return null
}



