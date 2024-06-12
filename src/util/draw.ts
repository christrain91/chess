import { Color, Piece } from '../types';

export function isDrawByInsufficientMaterial(pieces: Piece[]): boolean {
  const whitePieces = pieces.filter(piece => piece.color === Color.WHITE)
  const blackPieces = pieces.filter(piece => piece.color === Color.BLACK)

  const whiteHasInsufficientMaterial = hasInsufficientMaterial(whitePieces)
  const blackHasInsufficientMaterial = hasInsufficientMaterial(blackPieces)

  return whiteHasInsufficientMaterial && blackHasInsufficientMaterial
}

function hasInsufficientMaterial(pieces: Piece[]): boolean {
  return hasLoneKing(pieces) || hasLoneKingAndBishop(pieces) || hasLoneKingAndKnight(pieces) || hasLoneKingAndTwoKnights(pieces)
}

function hasLoneKing(pieces: Piece[]): boolean {
  return pieces.length <= 1
}

function hasLoneKingAndBishop(pieces: Piece[]): boolean {
  if (pieces.length !== 2) return false

  const king = pieces.find(piece => piece.type === 'king')
  const bishop = pieces.find(piece => piece.type === 'bishop')

  if (!king || !bishop) return false

  return true
}

function hasLoneKingAndKnight(pieces: Piece[]): boolean {
  if (pieces.length !== 2) return false

  const king = pieces.find(piece => piece.type === 'king')
  const knight = pieces.find(piece => piece.type === 'knight')

  if (!king || !knight) return false

  return true
}

function hasLoneKingAndTwoKnights(pieces: Piece[]): boolean {
  if (pieces.length !== 3) return false

  const king = pieces.find(piece => piece.type === 'king')
  const knights = pieces.filter(piece => piece.type === 'knight')

  if (!king || knights.length !== 2) return false

  return true
}

