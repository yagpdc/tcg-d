import { useState } from 'react'
import type { Card, AddCardsOptions } from '../types'
import { DC_PACK_PRICE, DC_CARD_PRICE, DC_BULK_PACK_PRICE, BULK_PACK_COUNT } from '../types'
import { openPack, openSingleCard } from '../lib/pack'
import { cardCatalog } from '../data/cards'
import { CardDisplay } from './CardDisplay'
import { PackVisual } from './PackVisual'
import { DrivaCoin } from './DrivaCoin'

interface ShopProps {
  coins: number
  onBuyPack: () => boolean
  onSpendCoins: (amount: number) => boolean
  onPackOpened: (cards: Card[], options?: AddCardsOptions) => void
}

function CardBackVisual() {
  return (
    <div
      className="card-font relative overflow-hidden rounded-xl"
      style={{
        width: '140px',
        height: '196px',
        background: 'linear-gradient(135deg, #003355, #001c30 40%, #002a47 60%, #003355)',
        border: '1px solid rgba(240,127,45,0.25)',
      }}
    >
      {/* Crosshatch pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 8px, white 8px, white 9px), repeating-linear-gradient(-45deg, transparent, transparent 8px, white 8px, white 9px)',
        }}
      />
      {/* Top bar */}
      <div
        className="flex h-2.5 w-full items-center justify-center"
        style={{
          background:
            'linear-gradient(to right, rgba(0,51,85,0.4), rgba(240,127,45,0.15), rgba(0,51,85,0.4))',
        }}
      >
        <div
          className="h-px w-3/4"
          style={{
            background:
              'linear-gradient(to right, transparent, rgba(240,127,45,0.2), transparent)',
          }}
        />
      </div>
      {/* Center content */}
      <div className="flex h-full flex-col items-center justify-center gap-2">
        {/* Logo circle */}
        <div className="relative h-12 w-12">
          <div
            className="absolute -inset-1 rounded-full blur-sm"
            style={{
              background: 'radial-gradient(circle, rgba(240,127,45,0.2) 0%, transparent 70%)',
            }}
          />
          <div
            className="relative h-full w-full overflow-hidden rounded-full"
            style={{ border: '1px solid rgba(240,127,45,0.3)' }}
          >
            <img src="/driva-logo.png" alt="Driva" className="h-full w-full object-cover" />
          </div>
        </div>
        {/* Separator */}
        <div
          className="h-px w-16"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(240,127,45,0.3), transparent)',
          }}
        />
        {/* Brand */}
        <img src="/driva-branco.png" alt="Driva" className="h-3 object-contain opacity-50" />
        <span
          className="text-[6px] font-semibold tracking-[0.25em] opacity-40"
          style={{ color: '#F07F2D' }}
        >
          CARD GAME
        </span>
      </div>
      {/* Bottom bar */}
      <div
        className="absolute bottom-0 flex h-2.5 w-full items-center justify-center"
        style={{
          background:
            'linear-gradient(to right, rgba(0,51,85,0.4), rgba(240,127,45,0.15), rgba(0,51,85,0.4))',
        }}
      >
        <div
          className="h-px w-3/4"
          style={{
            background:
              'linear-gradient(to right, transparent, rgba(240,127,45,0.2), transparent)',
          }}
        />
      </div>
    </div>
  )
}

export function Shop({ coins, onBuyPack, onSpendCoins, onPackOpened }: ShopProps) {
  const [revealedCards, setRevealedCards] = useState<Card[] | null>(null)
  const [isOpening, setIsOpening] = useState(false)

  function handleBuyCard() {
    if (isOpening) return
    const success = onSpendCoins(DC_CARD_PRICE)
    if (!success) return
    setIsOpening(true)
    setTimeout(() => {
      const card = openSingleCard(cardCatalog)
      setRevealedCards([card])
      onPackOpened([card], { decrementPack: false, grantCoins: false })
      setIsOpening(false)
    }, 600)
  }

  function handleBuyPack() {
    if (isOpening) return
    const success = onBuyPack()
    if (!success) return
    setIsOpening(true)
    setTimeout(() => {
      const cards = openPack(cardCatalog)
      setRevealedCards(cards)
      onPackOpened(cards, { decrementPack: false, grantCoins: false })
      setIsOpening(false)
    }, 600)
  }

  function handleBuyBulk() {
    if (isOpening) return
    const success = onSpendCoins(DC_BULK_PACK_PRICE)
    if (!success) return
    setIsOpening(true)
    setTimeout(() => {
      const allCards: Card[] = []
      for (let i = 0; i < BULK_PACK_COUNT; i++) {
        allCards.push(...openPack(cardCatalog))
      }
      setRevealedCards(allCards)
      onPackOpened(allCards, { decrementPack: false, grantCoins: false })
      setIsOpening(false)
    }, 600)
  }

  function handleDismiss() {
    setRevealedCards(null)
  }

  const canBuyCard = coins >= DC_CARD_PRICE
  const canBuyPack = coins >= DC_PACK_PRICE
  const canBuyBulk = coins >= DC_BULK_PACK_PRICE

  return (
    <div className="flex flex-col gap-10">
      {/* Two-column layout: Products | Coins */}
      <div className="flex items-start gap-12">
        {/* Left: Products */}
        <div className="flex flex-wrap items-start gap-8">
          {/* 1 Carta */}
          <div className="flex flex-col items-center gap-4">
            <div
              className={`
                relative transition-all duration-300
                ${canBuyCard && !isOpening ? 'cursor-pointer hover:scale-105' : 'opacity-50'}
                ${isOpening ? 'animate-pulse' : ''}
              `}
              onClick={canBuyCard && !isOpening ? handleBuyCard : undefined}
            >
              <CardBackVisual />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm text-gray-300">1 Carta</span>
              <button
                onClick={handleBuyCard}
                disabled={!canBuyCard || isOpening}
                className="rounded-lg bg-amber-600 px-5 py-2 text-sm font-bold transition-colors hover:bg-amber-500 disabled:opacity-50"
              >
                {DC_CARD_PRICE} DC
              </button>
            </div>
          </div>

          {/* 1 Pack */}
          <div className="flex flex-col items-center gap-4">
            <div
              className={`
                relative transition-all duration-300
                ${canBuyPack && !isOpening ? 'cursor-pointer hover:scale-105' : 'opacity-50'}
                ${isOpening ? 'animate-pulse' : ''}
              `}
              onClick={canBuyPack && !isOpening ? handleBuyPack : undefined}
              style={{ width: '160px', height: '248px' }}
            >
              <div
                className="absolute left-0 top-0 origin-top-left"
                style={{ width: '200px', transform: 'scale(0.8)' }}
              >
                <PackVisual />
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm text-gray-300">1 Pack</span>
              <button
                onClick={handleBuyPack}
                disabled={!canBuyPack || isOpening}
                className="rounded-lg bg-amber-600 px-5 py-2 text-sm font-bold transition-colors hover:bg-amber-500 disabled:opacity-50"
              >
                {DC_PACK_PRICE} DC
              </button>
            </div>
          </div>

          {/* 5 Packs */}
          <div className="flex flex-col items-center gap-4">
            <div
              className={`
                relative transition-all duration-300
                ${canBuyBulk && !isOpening ? 'cursor-pointer hover:scale-105' : 'opacity-50'}
                ${isOpening ? 'animate-pulse' : ''}
              `}
              onClick={canBuyBulk && !isOpening ? handleBuyBulk : undefined}
              style={{ width: '200px', height: '270px' }}
            >
              {/* Stacked packs */}
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute origin-top-left"
                  style={{
                    width: '200px',
                    transform: `scale(0.8) translate(${i * 8}px, ${-i * 4}px)`,
                    zIndex: i,
                  }}
                >
                  <PackVisual />
                </div>
              ))}
              {/* x5 badge */}
              <div
                className="absolute z-50 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-lg"
                style={{ right: '0px', top: '-4px' }}
              >
                x5
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm text-gray-300">5 Packs</span>
              <button
                onClick={handleBuyBulk}
                disabled={!canBuyBulk || isOpening}
                className="rounded-lg bg-amber-600 px-5 py-2 text-sm font-bold transition-colors hover:bg-amber-500 disabled:opacity-50"
              >
                {DC_BULK_PACK_PRICE} DC
              </button>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-72 w-px shrink-0 bg-gray-700/50" />

        {/* Right: Comprar Driva Coins */}
        <div className="shrink-0">
          <h3 className="mb-6 text-xl font-bold">Driva Coins</h3>
          <div className="flex flex-wrap items-start gap-8">
            {[
              { amount: 50, label: '50 DC' },
              { amount: 150, label: '150 DC' },
              { amount: 500, label: '500 DC' },
            ].map((offer) => (
              <div
                key={offer.amount}
                className="flex flex-col items-center gap-4"
              >
                <DrivaCoin scale={0.5} />
                <div className="flex flex-col items-center gap-1">
                  <span className="text-sm font-bold text-amber-300">{offer.label}</span>
                  <span className="text-xs text-gray-500">Em breve</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revealed cards from purchase */}
      {revealedCards && (
        <div className="flex flex-col items-center gap-6">
          <h3 className="text-lg font-semibold text-gray-300">Você recebeu:</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {revealedCards.map((card, i) => (
              <CardDisplay key={`${card.id}-${i}`} card={card} tier="prata" />
            ))}
          </div>
          <button
            onClick={handleDismiss}
            className="rounded-lg border border-gray-700 px-6 py-2 text-sm text-gray-400 transition-colors hover:border-gray-500 hover:text-white"
          >
            Fechar
          </button>
        </div>
      )}
    </div>
  )
}
