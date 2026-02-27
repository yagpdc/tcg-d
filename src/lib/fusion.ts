import type { BackpackSlotData, Tier } from '../types'
import { TIER_ORDER, FUSION_COST } from '../types'

export function getNextTier(tier: Tier): Tier | null {
  const index = TIER_ORDER.indexOf(tier)
  if (index >= TIER_ORDER.length - 1) return null
  return TIER_ORDER[index + 1]
}

/**
 * Check if a set of selected slots can be fused.
 * Requires exactly 3 slots, all same cardId and same tier, and tier is not max.
 */
export function canFuseSlots(
  slots: BackpackSlotData[],
  selectedIndices: number[],
): boolean {
  if (selectedIndices.length !== FUSION_COST) return false

  const items = selectedIndices.map((i) => slots[i])
  if (items.some((s) => !s)) return false

  const first = items[0]
  const allSame = items.every(
    (s) => s.cardId === first.cardId && s.tier === first.tier,
  )
  if (!allSame) return false

  return getNextTier(first.tier) !== null
}
