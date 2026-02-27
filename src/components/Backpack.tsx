import { useState, useMemo } from 'react'
import type { BackpackSlotData } from '../types'
import { BACKPACK_COLS, CARDS_PER_PAGE, RARITY_ORDER, TIER_ORDER } from '../types'
import { cardCatalog } from '../data/cards'
import { getNextTier } from '../lib/fusion'
import { BackpackSlot } from './BackpackSlot'
import { FusionModal } from './FusionModal'

interface BackpackProps {
  backpackSlots: BackpackSlotData[]
  onFuse: (slotIndices: number[]) => void
}

interface SortedCard {
  slot: BackpackSlotData
  originalIndex: number
}

export function Backpack({ backpackSlots, onFuse }: BackpackProps) {
  const [page, setPage] = useState(0)
  const [showFusionModal, setShowFusionModal] = useState(false)

  // Sort: rarity desc, then group same cardId, then tier desc
  const sorted: SortedCard[] = useMemo(() => {
    const mapped = backpackSlots.map((slot, i) => ({
      slot,
      originalIndex: i,
    }))

    return mapped.sort((a, b) => {
      const cardA = cardCatalog.find((c) => c.id === a.slot.cardId)
      const cardB = cardCatalog.find((c) => c.id === b.slot.cardId)

      const rarityA = cardA ? RARITY_ORDER.indexOf(cardA.rarity) : -1
      const rarityB = cardB ? RARITY_ORDER.indexOf(cardB.rarity) : -1

      if (rarityA !== rarityB) return rarityB - rarityA
      if (a.slot.cardId !== b.slot.cardId) return a.slot.cardId.localeCompare(b.slot.cardId)

      const tierA = TIER_ORDER.indexOf(a.slot.tier)
      const tierB = TIER_ORDER.indexOf(b.slot.tier)
      return tierB - tierA
    })
  }, [backpackSlots])

  // Check if there are any fusable groups (3+ same cardId+tier with tier < max)
  const hasFusableCards = useMemo(() => {
    const counts = new Map<string, number>()
    for (const slot of backpackSlots) {
      if (getNextTier(slot.tier) === null) continue
      const key = `${slot.cardId}:${slot.tier}`
      counts.set(key, (counts.get(key) || 0) + 1)
    }
    return [...counts.values()].some((c) => c >= 3)
  }, [backpackSlots])

  const totalPages = Math.max(1, Math.ceil(sorted.length / CARDS_PER_PAGE))

  // Clamp page
  const safePage = Math.min(page, totalPages - 1)
  if (safePage !== page) setPage(safePage)

  const pageCards = sorted.slice(safePage * CARDS_PER_PAGE, (safePage + 1) * CARDS_PER_PAGE)

  function handleFuse(slotIndices: number[]) {
    onFuse(slotIndices)
    setShowFusionModal(false)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Stats bar */}
      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center gap-4">
          <span>
            <strong className="text-white">{backpackSlots.length}</strong> cartas
          </span>
          <button
            onClick={() => setShowFusionModal(true)}
            disabled={!hasFusableCards}
            className="rounded-lg bg-amber-600 px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-amber-500 disabled:opacity-30"
          >
            Fundir
          </button>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={safePage === 0}
              className="rounded px-2 py-1 text-xs transition-colors hover:bg-white/10 disabled:opacity-30"
            >
              ←
            </button>
            <span className="text-xs">
              {safePage + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={safePage >= totalPages - 1}
              className="rounded px-2 py-1 text-xs transition-colors hover:bg-white/10 disabled:opacity-30"
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* Grid */}
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${BACKPACK_COLS}, minmax(0, 1fr))` }}
      >
        {pageCards.map(({ slot, originalIndex }) => {
          const card = cardCatalog.find((c) => c.id === slot.cardId) ?? null

          return (
            <BackpackSlot
              key={originalIndex}
              card={card}
              tier={slot.tier}
              selected={false}
              onClick={() => {}}
            />
          )
        })}
      </div>

      {backpackSlots.length === 0 && (
        <p className="py-8 text-center text-sm text-gray-600">
          Nenhuma carta ainda. Abra packs para começar!
        </p>
      )}

      {/* Fusion Modal */}
      {showFusionModal && (
        <FusionModal
          backpackSlots={backpackSlots}
          onFuse={handleFuse}
          onClose={() => setShowFusionModal(false)}
        />
      )}
    </div>
  )
}
