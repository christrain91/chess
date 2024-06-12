import { useGameStateStore } from '@/stores/GameStateStore'
import { Color } from '@/types'

export function MoveHistory() {
  const moves = useGameStateStore((state) => state.moves)

  const whiteMoves = moves.filter((move) => move.piece.color === Color.WHITE)
  const blackMoves = moves.filter((move) => move.piece.color === Color.BLACK)

  const moveItems = whiteMoves.map((whiteMove, index) => {
    const blackMove = blackMoves[index]

    return <li key={index}>{index + 1}. {whiteMove.notation} {blackMove?.notation || ''}</li >
  })

  return (
    <div>
      <h2>Move History</h2>
      <ul>
        {moveItems}
        {/* <li>1. e4 e5</li>
        <li>2. Nf3 Nc6</li>
        <li>3. Bb5 a6</li>
        <li>4. Ba4 Nf6</li>
        <li>5. O-O Be7</li>
        <li>6. Re1 b5</li>
        <li>7. Bb3 d6</li>
        <li>8. c3 O-O</li>
        <li>9. h3 Nb8</li>
        <li>10. d4 Nbd7</li>
        <li>11. Nbd2 Bb7</li>
        <li>12. Bc2 Re8</li>
        <li>13. Nf1 Bf8</li>
        <li>14. Ng3 g6</li>
        <li>15. a4 Bg7</li>
        <li>16. Bg5 h6</li>
        <li>17. Bd2 c5</li>
        <li>18. d5 c4</li>
        <li>19. Be3 Qc7</li>
        <li>20. Qd2 h5</li>
        <li>21. Bh6 Bh8</li>
        <li>22. Nh4 Nc5</li>
        <li>23. Rf1 Qe7</li>
        <li>24. Bg5 Qf8</li>
        <li>25. f4 exf4</li>
        <li>26. Qxf4 Nfd7</li>
        <li>27. Nhf5 gxf5</li>
        <li>28. Nxf5 Be5</li>
        <li>29. Qh4 f6</li>
        <li>30. Bh6 Qf7</li>
        <li>31. Rf3 Kh7</li>
        <li>32. Bf4 Rg8</li>
        <li>33. Nxd6 Qg6</li>
        <li>34. Rg3 Bxf4</li> */}
      </ul>
    </div >
  )
}