import { useMemo, useState } from 'react'
import type { BackpackSlotData, Tier } from '../types'
import { TIER_LABELS, RARITY_ORDER } from '../types'
import { getNextTier } from '../lib/fusion'
import { cardCatalog } from '../data/cards'
import { CardDisplay } from './CardDisplay'

interface FusionModalProps {
  backpackSlots: BackpackSlotData[]
  onFuse: (slotIndices: number[]) => void
  onClose: () => void
}

interface FusableGroup {
  cardId: string
  tier: Tier
  indices: number[]
}

export function FusionModal({ backpackSlots, onFuse, onClose }: FusionModalProps) {
  const [selectedGroup, setSelectedGroup] = useState<FusableGroup | null>(null)

  const fusableGroups = useMemo(() => {
    const counts = new Map<string, FusableGroup>()
    backpackSlots.forEach((slot, i) => {
      const key = `${slot.cardId}:${slot.tier}`
      const entry = counts.get(key) || { cardId: slot.cardId, tier: slot.tier, indices: [] }
      entry.indices.push(i)
      counts.set(key, entry)
    })
    const groups = [...counts.values()].filter(
      (g) => g.indices.length >= 3 && getNextTier(g.tier) !== null,
    )
    // Sort by rarity desc
    groups.sort((a, b) => {
      const cardA = cardCatalog.find((c) => c.id === a.cardId)
      const cardB = cardCatalog.find((c) => c.id === b.cardId)
      const rarA = cardA ? RARITY_ORDER.indexOf(cardA.rarity) : -1
      const rarB = cardB ? RARITY_ORDER.indexOf(cardB.rarity) : -1
      return rarB - rarA
    })
    return groups
  }, [backpackSlots])

  const selectedIndices = selectedGroup ? selectedGroup.indices.slice(0, 3) : []
  const selectedCard = selectedGroup
    ? cardCatalog.find((c) => c.id === selectedGroup.cardId) ?? null
    : null
  const nextTier = selectedGroup ? getNextTier(selectedGroup.tier) : null

  function handleFuse() {
    if (selectedIndices.length !== 3) return
    onFuse(selectedIndices)
    setSelectedGroup(null)
  }

  // Slot positions around the circle (top, bottom-right, bottom-left)
  const slotPositions = [
    { top: '0px', left: '50%', transform: 'translate(-50%, 0)' },
    { bottom: '0px', right: '8px', transform: 'translate(0, 0)' },
    { bottom: '0px', left: '8px', transform: 'translate(0, 0)' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
      {/* Backdrop */}
      <div
        className="animate-modal-backdrop absolute inset-0 bg-black/80"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative z-10 flex max-h-[90vh] flex-col items-center gap-6 overflow-y-auto px-4">
        <h2 className="text-xl font-bold text-white">Fusão</h2>

        {/* Fusion circle */}
        <div className="relative" style={{ width: '320px', height: '300px' }}>
          {/* Input slots (3 around the circle) */}
          {slotPositions.map((pos, i) => {
            const hasCard = i < selectedIndices.length && selectedCard
            return (
              <div
                key={i}
                className="absolute"
                style={{ ...pos, width: '88px', height: '123px' }}
              >
                {hasCard ? (
                  <div className="origin-top-left" style={{ width: '192px', transform: 'scale(0.458)' }}>
                    <CardDisplay card={selectedCard} tier={selectedGroup!.tier} />
                  </div>
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-600 bg-gray-900/50">
                    <span className="text-2xl text-gray-600">?</span>
                  </div>
                )}
              </div>
            )
          })}

          {/* Connector lines */}
          <svg
            className="pointer-events-none absolute inset-0"
            width="320"
            height="300"
            viewBox="0 0 320 300"
          >
            {/* Top slot → center */}
            <line x1="160" y1="123" x2="160" y2="140" stroke="rgba(251,191,36,0.3)" strokeWidth="2" />
            {/* Bottom-left → center */}
            <line x1="52" y1="177" x2="130" y2="160" stroke="rgba(251,191,36,0.3)" strokeWidth="2" />
            {/* Bottom-right → center */}
            <line x1="268" y1="177" x2="190" y2="160" stroke="rgba(251,191,36,0.3)" strokeWidth="2" />
          </svg>

          {/* Center result slot */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ width: '96px', height: '134px' }}
          >
            {selectedCard && nextTier ? (
              <div className="animate-fusion-glow origin-top-left" style={{ width: '192px', transform: 'scale(0.5)' }}>
                <CardDisplay card={selectedCard} tier={nextTier} />
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-lg border-2 border-amber-700/40 bg-amber-950/20">
                <span className="text-xs text-amber-700/60">Resultado</span>
              </div>
            )}
          </div>
        </div>

        {/* Tier upgrade label */}
        {selectedGroup && nextTier && (
          <p className="text-sm text-gray-300">
            <span className="text-gray-500">{TIER_LABELS[selectedGroup.tier]}</span>
            {' → '}
            <strong className="text-amber-300">{TIER_LABELS[nextTier]}</strong>
          </p>
        )}

        {/* Fuse / Close buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleFuse}
            disabled={selectedIndices.length !== 3}
            className="rounded-lg bg-amber-600 px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-amber-500 disabled:opacity-30"
          >
            Fundir
          </button>
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-700 px-6 py-2 text-sm text-gray-400 transition-colors hover:border-gray-500 hover:text-white"
          >
            Fechar
          </button>
        </div>

        {/* Available fusable groups */}
        <div className="w-full max-w-lg">
          <p className="mb-3 text-xs text-gray-500">Selecione cartas para fundir:</p>
          {fusableGroups.length === 0 ? (
            <p className="py-4 text-center text-sm text-gray-600">
              Nenhuma carta disponível para fusão.
            </p>
          ) : (
            <div className="flex flex-wrap justify-center gap-3">
              {fusableGroups.map((group) => {
                const card = cardCatalog.find((c) => c.id === group.cardId)
                if (!card) return null
                const isSelected =
                  selectedGroup?.cardId === group.cardId &&
                  selectedGroup?.tier === group.tier

                return (
                  <button
                    key={`${group.cardId}:${group.tier}`}
                    onClick={() => setSelectedGroup(isSelected ? null : group)}
                    className={`relative rounded-lg p-1 transition-all ${
                      isSelected
                        ? 'ring-2 ring-amber-400 bg-amber-950/30'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="origin-top-left" style={{ width: '80px', height: '112px', overflow: 'hidden' }}>
                      <div style={{ width: '192px', transform: 'scale(0.416)', transformOrigin: 'top left' }}>
                        <CardDisplay card={card} tier={group.tier} />
                      </div>
                    </div>
                    {/* Count badge */}
                    <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                      {group.indices.length}
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
