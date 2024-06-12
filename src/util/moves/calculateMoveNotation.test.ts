import { calculateMoveNotation } from './calculateMoveNotation'
import { File, PieceType, Piece, Color, CastleType, MoveWithoutNotation } from '@/types'

const boardPieces: Piece[] = [

  { type: PieceType.KING, square: { rank: 1, file: File.E }, color: Color.WHITE },
  { type: PieceType.QUEEN, square: { rank: 6, file: File.D }, color: Color.WHITE },
  { type: PieceType.QUEEN, square: { rank: 6, file: File.A }, color: Color.WHITE },
  { type: PieceType.PAWN, square: { rank: 2, file: File.E }, color: Color.BLACK },
  { type: PieceType.KING, square: { rank: 8, file: File.E }, color: Color.BLACK },
]


describe('calculateMoveNotation', () => {
  it('Should give the correct notation for a king move when it is not a capture and does not result in check or mate', () => {
    const whiteKing: Piece = { type: PieceType.KING, square: { rank: 1, file: File.E }, color: Color.WHITE }

    const move: MoveWithoutNotation = {
      from: { rank: 1, file: File.E },
      to: { rank: 2, file: File.D },
      piece: whiteKing,
    }

    const result = calculateMoveNotation(move, boardPieces, [])
    expect(result).toBe('Kd2')
  })

  it('Should give the correct notation for a king move when it is a capture and does not result in check or mate', () => {
    const whiteKing: Piece = { type: PieceType.KING, square: { rank: 1, file: File.E }, color: Color.WHITE }
    const blackPawn: Piece = { type: PieceType.PAWN, square: { rank: 2, file: File.E }, color: Color.BLACK }

    const move: MoveWithoutNotation = {
      from: { rank: 1, file: File.E },
      to: { rank: 2, file: File.E },
      piece: whiteKing,
      capture: blackPawn
    }

    const result = calculateMoveNotation(move, boardPieces, [])
    expect(result).toBe('Kxe2')
  })

  it('Should give the correct notation for a queen move when it is not a capture and results in check', () => {
    const whiteQueen: Piece = { type: PieceType.QUEEN, square: { rank: 8, file: File.D }, color: Color.WHITE }

    const move: MoveWithoutNotation = {
      from: { rank: 6, file: File.D },
      to: { rank: 7, file: File.E },
      piece: whiteQueen,
    }

    const result = calculateMoveNotation(move, boardPieces, [])
    expect(result).toBe('Qe7+')
  })

  it('Should specify which piece is moving, when there are multiple of the same type and both can go to the target square', () => {
    const whiteQueen: Piece = { type: PieceType.QUEEN, square: { rank: 6, file: File.A }, color: Color.WHITE }
    const move: MoveWithoutNotation = {
      from: { rank: 6, file: File.A },
      to: { rank: 6, file: File.B },
      piece: whiteQueen,
    }

    const result = calculateMoveNotation(move, boardPieces, [])
    expect(result).toBe('Qab6')
  })

  it('Should notate kingside castling', () => {
    const whiteKing: Piece = { type: PieceType.KING, square: { rank: 1, file: File.E }, color: Color.WHITE }
    const whiteRook: Piece = { type: PieceType.ROOK, square: { rank: 1, file: File.H }, color: Color.WHITE }
    const move = {
      castle: CastleType.KINGSIDE, from: { rank: 6, file: File.A },
      to: { rank: 6, file: File.G },
      piece: whiteKing
    }
    const result = calculateMoveNotation(move, [whiteKing, whiteRook], [])

    expect(result).toBe('O-O')
  })

  it('Should notate queenside castling', () => {
    const whiteKing: Piece = { type: PieceType.KING, square: { rank: 1, file: File.E }, color: Color.WHITE }
    const whiteRook: Piece = { type: PieceType.ROOK, square: { rank: 1, file: File.A }, color: Color.WHITE }
    const move = {
      castle: CastleType.QUEENSIDE, from: { rank: 6, file: File.A },
      to: { rank: 6, file: File.C },
      piece: whiteKing
    }
    const result = calculateMoveNotation(move, [whiteKing, whiteRook], [])

    expect(result).toBe('O-O-O')
  })

})