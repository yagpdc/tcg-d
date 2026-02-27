export type CardType = 'colaborador' | 'produto'

export type Rarity = 'comum' | 'incomum' | 'raro' | 'epico' | 'lendario'

export type Tier = 'prata' | 'ouro' | 'platina' | 'diamante'

export interface Card {
  id: string
  name: string
  description: string
  type: CardType
  rarity: Rarity
  image?: string
}

export interface BackpackSlotData {
  cardId: string
  tier: Tier
}

export interface PlayerState {
  packCount: number
  lastPackTick: number
  coins: number
  backpackSlots: BackpackSlotData[]
}

export interface AddCardsOptions {
  decrementPack?: boolean
  grantCoins?: boolean
}

// Rarity
export const RARITY_ORDER: Rarity[] = ['comum', 'incomum', 'raro', 'epico', 'lendario']

export const RARITY_LABELS: Record<Rarity, string> = {
  comum: 'Comum',
  incomum: 'Incomum',
  raro: 'Raro',
  epico: 'Épico',
  lendario: 'Lendário',
}

export const RARITY_COLORS: Record<Rarity, string> = {
  comum: 'gray',
  incomum: 'green',
  raro: 'blue',
  epico: 'purple',
  lendario: 'amber',
}

// Tier
export const TIER_ORDER: Tier[] = ['prata', 'ouro', 'platina', 'diamante']

export const TIER_LABELS: Record<Tier, string> = {
  prata: 'Prata',
  ouro: 'Ouro',
  platina: 'Platina',
  diamante: 'Diamante',
}

// Pack
export const PACK_COOLDOWN_MS = 60 * 60 * 1000 // 1 hour
export const MAX_PACKS = 5
export const CARDS_PER_PACK = 5

// Backpack
export const BACKPACK_COLS = 10
export const CARDS_PER_PAGE = 30

// Fusion
export const FUSION_COST = 3

// Driva Coin
export const DC_PER_PACK_REWARD = 10
export const DC_CARD_PRICE = 15
export const DC_PACK_PRICE = 50
export const DC_BULK_PACK_PRICE = 200
export const BULK_PACK_COUNT = 5
