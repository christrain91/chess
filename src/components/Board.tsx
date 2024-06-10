import { useMemo } from 'react'
import type { Rank, File } from '../types'
import { Square } from './Square'



export const Board = () => {
  const squares = useMemo(() => generateSquares(), [])

  return <div className="aspect-square grid grid-cols-8 grid-rows-8 max-w-full max-h-full">
    {squares}
  </div>
}

function generateSquares  ()  {
  const squares = Array(8).fill(null).map((_, rankIndex) => {
    const rank = 8 - rankIndex
    return Array(8).fill(null).map((_, fileIndex) => {
      const file = String.fromCharCode(97 + fileIndex)
      const startsWithBlack = rank % 2 === 0
      const black = (fileIndex % 2 === 0 && startsWithBlack) || (fileIndex % 2 !== 0 && !startsWithBlack)
      return <Square key={`${rank}${file}`} rank={rank as Rank} file={file as File} black={black} />
    })
  }).flat()
  return squares
}