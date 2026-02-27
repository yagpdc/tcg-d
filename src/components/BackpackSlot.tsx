import { useRef, useState, useEffect } from 'react'
import type { Card, Tier } from '../types'
import { CardDisplay } from './CardDisplay'

interface BackpackSlotProps {
  card: Card | null
  tier: Tier
  selected: boolean
  onClick: () => void
}

export function BackpackSlot({ card, tier, selected, onClick }: BackpackSlotProps) {
  const slotRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.55)

  useEffect(() => {
    if (!slotRef.current) return
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width
      if (width) setScale(width / 192)
    })
    observer.observe(slotRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={slotRef}
      onClick={onClick}
      className="relative aspect-[63/88] cursor-pointer rounded-md transition-colors"
    >
      {card ? (
        <div
          className={`relative h-full w-full overflow-hidden rounded-lg ${selected ? 'ring-2 ring-amber-400' : ''}`}
        >
          <div
            className="absolute left-0 top-0 origin-top-left"
            style={{
              width: '192px',
              transform: `scale(${scale})`,
            }}
          >
            <CardDisplay card={card} tier={tier} />
          </div>
        </div>
      ) : null}
    </div>
  )
}
