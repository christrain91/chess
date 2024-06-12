import { PieceType, Rank, File, PromotionPieceType, Color } from '../types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { Piece } from './Piece';




interface PromotionSelectorProps {
  onSelect: (type: PromotionPieceType) => void
  color: Color
  open: boolean
}
const promotionPieces = [PieceType.QUEEN, PieceType.ROOK, PieceType.BISHOP, PieceType.KNIGHT] as PromotionPieceType[]

export function PromotionSelector({ onSelect, color, open }: PromotionSelectorProps) {
  return (
    <Popover open={open}>
      <PopoverTrigger></PopoverTrigger>
      <PopoverContent className="w-[400px]">
        <div className="flex gap-2 w-full justify-stretch items-center">
          {promotionPieces.map((pieceType) => (
            <div key={pieceType} className="flex-1 hover:bg-slate-100 rounded aspect-square">
              <Piece onClick={() => onSelect(pieceType)} type={pieceType} rank={Rank.ONE} file={File.A} black={color === Color.BLACK} />
            </div>

          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}