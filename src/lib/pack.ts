import type { Card, Rarity } from '../types'
import { CARDS_PER_PACK } from '../types'

const RARITY_WEIGHTS: Record<Rarity, number> = {
  comum: 35,
  regular: 25,
  incomum: 18,
  raro: 11,
  epico: 5,
  lendario: 3.5,
  prismatico: 1,
  supremo: 0.5,
}

function rollRarity(): Rarity {
  const roll = Math.random() * 100
  let cumulative = 0

  for (const [rarity, weight] of Object.entries(RARITY_WEIGHTS)) {
    cumulative += weight
    if (roll < cumulative) {
      return rarity as Rarity
    }
  }

  return 'comum'
}

function pickRandomCard(cards: Card[]): Card {
  return cards[Math.floor(Math.random() * cards.length)]
}

export function openSingleCard(catalog: Card[]): Card {
  const rarity = rollRarity()
  const cardsOfRarity = catalog.filter((c) => c.rarity === rarity)
  return cardsOfRarity.length > 0
    ? pickRandomCard(cardsOfRarity)
    : pickRandomCard(catalog)
}

export function openPack(catalog: Card[]): Card[] {
  const pack: Card[] = []

  for (let i = 0; i < CARDS_PER_PACK; i++) {
    const rarity = rollRarity()
    const cardsOfRarity = catalog.filter((c) => c.rarity === rarity)

    if (cardsOfRarity.length > 0) {
      pack.push(pickRandomCard(cardsOfRarity))
    } else {
      // fallback: pick any card if no cards of that rarity exist
      pack.push(pickRandomCard(catalog))
    }
  }

  return pack
}
