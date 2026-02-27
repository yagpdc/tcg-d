import { useState, useCallback, useEffect } from 'react'
import type { PlayerState, Card, BackpackSlotData, AddCardsOptions } from '../types'
import { DC_PER_PACK_REWARD, DC_PACK_PRICE, PACK_COOLDOWN_MS, MAX_PACKS } from '../types'
import { getNextTier } from '../lib/fusion'

const STORAGE_KEY = 'driva-tcg-player'

function defaultState(): PlayerState {
  return {
    packCount: MAX_PACKS,
    lastPackTick: Date.now(),
    coins: 0,
    backpackSlots: [],
  }
}

function migratePackFields(data: Record<string, unknown>): { packCount: number; lastPackTick: number } {
  if (typeof data.packCount === 'number' && typeof data.lastPackTick === 'number') {
    return { packCount: data.packCount, lastPackTick: data.lastPackTick }
  }

  const lastClaim = data.lastPackClaim as number | null
  if (lastClaim !== null && lastClaim !== undefined) {
    const elapsed = Date.now() - lastClaim
    const accumulated = Math.floor(elapsed / PACK_COOLDOWN_MS)
    const packCount = Math.min(MAX_PACKS, Math.max(1, accumulated))
    const lastPackTick = packCount >= MAX_PACKS
      ? Date.now()
      : lastClaim + accumulated * PACK_COOLDOWN_MS
    return { packCount, lastPackTick }
  }

  return { packCount: MAX_PACKS, lastPackTick: Date.now() }
}

function migrateState(data: Record<string, unknown>): PlayerState {
  const { packCount, lastPackTick } = migratePackFields(data)

  let slots: BackpackSlotData[] = []

  // Old format with inventory array
  if (Array.isArray(data.inventory)) {
    for (const item of data.inventory as { cardId: string; tier?: string; quantity?: number }[]) {
      const tier = (item.tier || 'prata') as BackpackSlotData['tier']
      const qty = item.quantity || 1
      for (let i = 0; i < qty; i++) {
        slots.push({ cardId: item.cardId, tier })
      }
    }
  } else if (Array.isArray(data.backpackSlots)) {
    // Current format — filter out nulls from old fixed-size array
    slots = (data.backpackSlots as (BackpackSlotData | null)[]).filter(
      (s): s is BackpackSlotData => s !== null,
    )
  }

  return { packCount, lastPackTick, coins: (data.coins as number) ?? 0, backpackSlots: slots }
}

function loadState(): PlayerState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return migrateState(JSON.parse(raw))
  } catch {
    // corrupted data, reset
  }
  return defaultState()
}

function saveState(state: PlayerState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function usePlayerState() {
  const [state, setState] = useState<PlayerState>(loadState)

  // Auto-accumulate packs every second
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => {
        if (prev.packCount >= MAX_PACKS) return prev

        const now = Date.now()
        const elapsed = now - prev.lastPackTick
        const newPacks = Math.floor(elapsed / PACK_COOLDOWN_MS)

        if (newPacks <= 0) return prev

        const nextPackCount = Math.min(MAX_PACKS, prev.packCount + newPacks)
        const nextLastPackTick = nextPackCount >= MAX_PACKS
          ? now
          : prev.lastPackTick + newPacks * PACK_COOLDOWN_MS

        const next = { ...prev, packCount: nextPackCount, lastPackTick: nextLastPackTick }
        saveState(next)
        return next
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const addCards = useCallback((cards: Card[], options?: AddCardsOptions) => {
    const { decrementPack = true, grantCoins = true } = options ?? {}

    setState((prev) => {
      const newSlots = [
        ...prev.backpackSlots,
        ...cards.map((c) => ({ cardId: c.id, tier: 'prata' as const })),
      ]

      const next: PlayerState = {
        ...prev,
        backpackSlots: newSlots,
        packCount: decrementPack ? Math.max(0, prev.packCount - 1) : prev.packCount,
        coins: grantCoins ? prev.coins + DC_PER_PACK_REWARD : prev.coins,
      }
      saveState(next)
      return next
    })
  }, [])

  const buyPack = useCallback((): boolean => {
    let success = false
    setState((prev) => {
      if (prev.coins < DC_PACK_PRICE) return prev
      success = true
      const next = { ...prev, coins: prev.coins - DC_PACK_PRICE }
      saveState(next)
      return next
    })
    return success
  }, [])

  const spendCoins = useCallback((amount: number): boolean => {
    let success = false
    setState((prev) => {
      if (prev.coins < amount) return prev
      success = true
      const next = { ...prev, coins: prev.coins - amount }
      saveState(next)
      return next
    })
    return success
  }, [])

  const fuseSlots = useCallback((slotIndices: number[]) => {
    setState((prev) => {
      if (slotIndices.length !== 3) return prev

      const items = slotIndices.map((i) => prev.backpackSlots[i])
      if (items.some((s) => !s)) return prev

      const first = items[0]
      const allSame = items.every(
        (s) => s.cardId === first.cardId && s.tier === first.tier,
      )
      if (!allSame) return prev

      const nextTier = getNextTier(first.tier)
      if (!nextTier) return prev

      // Remove the 3 fused cards (highest indices first to keep indices valid)
      const sorted = [...slotIndices].sort((a, b) => b - a)
      const newSlots = [...prev.backpackSlots]
      for (const i of sorted) {
        newSlots.splice(i, 1)
      }
      // Add upgraded card
      newSlots.push({ cardId: first.cardId, tier: nextTier })

      const next: PlayerState = { ...prev, backpackSlots: newSlots }
      saveState(next)
      return next
    })
  }, [])

  const resetState = useCallback(() => {
    const fresh = defaultState()
    saveState(fresh)
    setState(fresh)
  }, [])

  return { state, addCards, fuseSlots, buyPack, spendCoins, resetState }
}
