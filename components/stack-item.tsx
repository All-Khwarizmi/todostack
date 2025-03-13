"use client"
import type { StackItem as StackItemType } from "@/types/stack"
import { formatDistanceToNow } from "date-fns"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

interface StackItemProps {
  item: StackItemType
  maxTimeInStack: number
  onSelect: (id: string) => void
  onOpenModal: (id: string) => void
  isTop: boolean
}

export function StackItem({ item, maxTimeInStack, onSelect, onOpenModal, isTop }: StackItemProps) {
  const timeLeft = item.createdAt + maxTimeInStack - Date.now()
  const percentageLeft = Math.max(0, Math.min(100, (timeLeft / maxTimeInStack) * 100))

  const formattedTimeLeft = formatDistanceToNow(new Date(item.createdAt + maxTimeInStack), {
    addSuffix: true,
  })

  return (
    <div
      className={cn(
        "border border-zinc-800 rounded-md p-3 mb-2 relative overflow-hidden transition-all duration-300",
        item.selected ? "bg-zinc-800 border-emerald-500" : "bg-zinc-900",
        isTop ? "border-l-emerald-500 border-l-4" : "",
      )}
      onClick={() => onOpenModal(item.id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={item.selected}
            onCheckedChange={() => onSelect(item.id)}
            onClick={(e) => e.stopPropagation()}
            className="border-zinc-600"
          />
          <h3 className="font-medium truncate">{item.title}</h3>
        </div>
        <span className="text-xs text-zinc-400">{formattedTimeLeft}</span>
      </div>

      {/* Progress bar for time left */}
      <div className="absolute bottom-0 left-0 h-1 bg-emerald-500/30" style={{ width: `${percentageLeft}%` }} />
    </div>
  )
}

