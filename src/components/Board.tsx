import { useMemo } from 'react'
import type { Rank, File } from '../types'
import { Square } from './Square'

interface BoardProps {
  invert: boolean
}

export const Board = (props: BoardProps) => {
  const { invert } = props
  const squares = useMemo(() => generateSquares(invert), [invert])

  return <div className="aspect-square grid grid-cols-8 grid-rows-8 max-w-full max-h-full">
    {squares}
  </div>
}

function generateSquares(invert: boolean): JSX.Element[]  {
  
  const squares = Array(8).fill(null).map((_, rankIndex) => {
    const rank = invert ? 1 + rankIndex : 8 - rankIndex
    return Array(8).fill(null).map((_, fileIndex) => {
      const file = String.fromCharCode(97 + fileIndex)
      const startsWithBlack = rank % 2 === 0
      const black = (fileIndex % 2 === 0 && startsWithBlack) || (fileIndex % 2 !== 0 && !startsWithBlack)
      return <Square key={`${rank}${file}`} rank={rank as Rank} file={file as File} black={black} invertedBoard={invert} />
    })
  }).flat()
  return squares
}