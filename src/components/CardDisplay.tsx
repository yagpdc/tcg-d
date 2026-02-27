import type { Card, Rarity, Tier } from '../types'
import { RARITY_LABELS, TIER_LABELS } from '../types'

// Metallic tier gradient borders (inspired by Pokémon TCG silver/gold card borders)
const tierGradients: Record<Tier, string> = {
  prata:
    'linear-gradient(-72deg, #dedede, #fff 16%, #dedede 21%, #fff 24%, #949494 27%, #dedede 36%, #fff 45%, #fff 60%, #dedede 72%, #fff 80%, #dedede 84%, #a1a1a1)',
  ouro:
    'linear-gradient(-72deg, #bf9b30, #ffd700 16%, #bf9b30 21%, #ffd700 24%, #a67c00 27%, #bf9b30 36%, #ffd700 45%, #ffd700 60%, #bf9b30 72%, #ffd700 80%, #bf9b30 84%, #a67c00)',
  platina:
    'linear-gradient(-72deg, #8ec5c5, #d4f0f0 16%, #8ec5c5 21%, #d4f0f0 24%, #6ba8a8 27%, #8ec5c5 36%, #d4f0f0 45%, #d4f0f0 60%, #8ec5c5 72%, #d4f0f0 80%, #8ec5c5 84%, #6ba8a8)',
  diamante:
    'linear-gradient(-72deg, #7ec8e3, #c8edff 16%, #7ec8e3 21%, #c8edff 24%, #5aafcf 27%, #7ec8e3 36%, #c8edff 45%, #c8edff 60%, #7ec8e3 72%, #c8edff 80%, #7ec8e3 84%, #5aafcf)',
}

// Inner card background based on rarity
const rarityInnerBg: Record<Rarity, string> = {
  comum: 'radial-gradient(circle at 50% 30%, #6b7280 0%, #4b5563 50%, #374151 100%)',
  regular: 'radial-gradient(circle at 50% 30%, #94a3b8 0%, #64748b 50%, #475569 100%)',
  incomum: 'radial-gradient(circle at 50% 30%, #4ade80 0%, #22c55e 50%, #166534 100%)',
  raro: 'radial-gradient(circle at 50% 30%, #60a5fa 0%, #3b82f6 50%, #1e40af 100%)',
  epico: 'radial-gradient(circle at 50% 30%, #9e5fb0 0%, #7d4099 50%, #5c2d78 100%)',
  lendario: 'radial-gradient(circle at 50% 30%, #fbbf24 0%, #d97706 50%, #92400e 100%)',
  prismatico: 'linear-gradient(135deg, #c4b5fd, #e2e8f0, #a78bfa, #fde68a, #c4b5fd)',
  supremo: 'radial-gradient(circle at 50% 30%, #F07F2D 0%, #c45a1a 50%, #7a3610 100%)',
}

// Image area background (darker tones per rarity)
const rarityImageBg: Record<Rarity, string> = {
  comum: 'linear-gradient(145deg, #1f2937, #111827 50%, #1a1f2b)',
  regular: 'linear-gradient(145deg, #334155, #1e293b 50%, #273548)',
  incomum: 'linear-gradient(145deg, #14532d, #052e16 50%, #0a3d1f)',
  raro: 'linear-gradient(145deg, #1e3a5f, #0c1e35 50%, #152a45)',
  epico: 'linear-gradient(145deg, #3a1a4a, #1a0a2a 50%, #2a1535)',
  lendario: 'linear-gradient(145deg, #451a03, #27170a 50%, #3b1505)',
  prismatico: 'linear-gradient(145deg, #2e1a47, #1a1030 50%, #251540)',
  supremo: 'linear-gradient(145deg, #3d1c08, #1a0d04 50%, #2a1208)',
}

// Rarity symbols (inspired by Pokémon ●/◆/★ system)
const raritySymbols: Record<Rarity, string> = {
  comum: '●',
  regular: '●●',
  incomum: '◆',
  raro: '★',
  epico: '★★',
  lendario: '★★★',
  prismatico: '✦',
  supremo: '♛',
}

const rarityColors: Record<Rarity, string> = {
  comum: '#9ca3af',
  regular: '#cbd5e1',
  incomum: '#4ade80',
  raro: '#60a5fa',
  epico: '#c084fc',
  lendario: '#fbbf24',
  prismatico: '#c4b5fd',
  supremo: '#F07F2D',
}

function getInnerBg(card: Card): string {
  return rarityInnerBg[card.rarity]
}

function getImageBg(card: Card): string {
  return rarityImageBg[card.rarity]
}

interface CardDisplayProps {
  card: Card
  tier?: Tier
  compact?: boolean
  selected?: boolean
}

export function CardDisplay({ card, tier, compact, selected }: CardDisplayProps) {
  const effectiveTier = tier ?? 'prata'
  const borderGradient = tierGradients[effectiveTier]
  const rarityColor = rarityColors[card.rarity]
  const typeBadge = card.type === 'colaborador'
    ? (card.description.split('·')[1]?.trim() ?? 'Colaborador')
    : 'Produto'

  if (compact) {
    return (
      <div
        className={`card-font relative h-full w-full rounded-md p-[2px] ${selected ? 'ring-2 ring-amber-400' : ''}`}
        style={{ backgroundImage: borderGradient }}
      >
        <div
          className="relative flex h-full w-full flex-col overflow-hidden rounded-[4px]"
          style={{ background: getInnerBg(card) }}
        >
          {/* Prismatic shimmer overlay (compact) */}
          {card.rarity === 'prismatico' && (
            <div
              className="pointer-events-none absolute inset-0 rounded-[4px] animate-prismatic-shimmer"
              style={{
                background: 'linear-gradient(135deg, rgba(196,181,253,0.2), rgba(226,232,240,0.25), rgba(167,139,250,0.2), rgba(253,230,138,0.15), rgba(196,181,253,0.2))',
                backgroundSize: '400% 400%',
                mixBlendMode: 'overlay',
                zIndex: 1,
              }}
            />
          )}
          {/* Supremo logo grid overlay (compact) */}
          {card.rarity === 'supremo' && (
            <div
              className="pointer-events-none absolute inset-0 rounded-[4px] opacity-[0.08]"
              style={{
                backgroundImage: 'url(/driva-logo.png)',
                backgroundSize: '20px 20px',
                backgroundRepeat: 'repeat',
                zIndex: 1,
              }}
            />
          )}

          {/* Mini header: type + name */}
          <div className="relative z-[2] flex items-center gap-0.5 px-1 pt-[3px]">
            <span
              className="shrink-0 rounded-[2px] px-[3px] text-[4px] font-bold uppercase leading-none tracking-wider"
              style={{ backgroundImage: borderGradient, color: '#333' }}
            >
              {card.type === 'colaborador' ? (typeBadge.length > 5 ? typeBadge.slice(0, 3).toUpperCase() : typeBadge.toUpperCase()) : 'PRD'}
            </span>
            <span className="flex-1 truncate text-right text-[5px] font-extrabold leading-none text-white/90 drop-shadow-sm">
              {card.name}
            </span>
          </div>

          {/* Mini separator */}
          <div className="relative z-[2] mx-1 mt-[2px] h-px" style={{ backgroundColor: 'rgba(0,0,0,0.25)' }} />

          {/* Mini image area */}
          <div
            className="relative z-[2] mx-1 mt-[2px] flex flex-1 items-center justify-center overflow-hidden rounded-[2px]"
            style={{ background: getImageBg(card) }}
          >
            {card.image ? (
              <img src={card.image} alt={card.name} className="h-full w-full object-cover" />
            ) : (
              <span className="text-lg font-black" style={{ color: 'rgba(255,255,255,0.12)' }}>
                {card.name.charAt(0)}
              </span>
            )}
          </div>

          {/* Mini separator */}
          <div className="relative z-[2] mx-1 mt-[2px] h-px" style={{ backgroundColor: 'rgba(0,0,0,0.25)' }} />

          {/* Mini footer: rarity + tier */}
          <div className="relative z-[2] flex items-center justify-between px-1 py-[2px]">
            <span
              className={`text-[5px] font-bold leading-none ${card.rarity === 'prismatico' ? 'animate-prismatic-text' : ''}`}
              style={card.rarity === 'prismatico' ? undefined : { color: rarityColor }}
            >
              {raritySymbols[card.rarity]}
            </span>
            {tier && (
              <span
                className="rounded-[2px] px-[3px] py-[1px] text-[4px] font-bold uppercase leading-none tracking-wider"
                style={{ backgroundImage: borderGradient, color: '#333' }}
              >
                {TIER_LABELS[tier]}
              </span>
            )}
            <span className="font-mono text-[4px] leading-none text-white/20">
              {card.id.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    )
  }

  // Full size card
  return (
    <div
      className="card-font relative flex flex-col rounded-xl p-[5px]"
      style={{
        backgroundImage: borderGradient,
        width: '192px',
        aspectRatio: '63/88',
      }}
    >
      {/* Inner card */}
      <div
        className="relative flex flex-1 flex-col overflow-hidden rounded-lg"
        style={{ background: getInnerBg(card) }}
      >
        {/* Prismatic shimmer overlay */}
        {card.rarity === 'prismatico' && (
          <div
            className="pointer-events-none absolute inset-0 rounded-lg animate-prismatic-shimmer"
            style={{
              background: 'linear-gradient(135deg, rgba(196,181,253,0.2), rgba(226,232,240,0.25), rgba(167,139,250,0.2), rgba(253,230,138,0.15), rgba(196,181,253,0.2))',
              backgroundSize: '400% 400%',
              mixBlendMode: 'overlay',
              zIndex: 1,
            }}
          />
        )}
        {/* Supremo logo grid overlay */}
        {card.rarity === 'supremo' && (
          <div
            className="pointer-events-none absolute inset-0 rounded-lg opacity-[0.08]"
            style={{
              backgroundImage: 'url(/driva-logo.png)',
              backgroundSize: '30px 30px',
              backgroundRepeat: 'repeat',
              zIndex: 1,
            }}
          />
        )}

        {/* Header: type badge + name */}
        <div className="relative z-[2] flex items-start gap-1.5 px-2.5 pb-1 pt-2">
          <span
            className="shrink-0 rounded-sm px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider"
            style={{ backgroundImage: borderGradient, color: '#333' }}
          >
            {typeBadge}
          </span>
          <h3 className="ml-1.5 flex-1 truncate text-right text-[13px] font-extrabold leading-tight text-white drop-shadow-md">
            {card.name}
          </h3>
        </div>

        {/* Separator */}
        <div
          className="relative z-[2] mx-2 h-px"
          style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.4)', backgroundColor: 'rgba(0,0,0,0.3)' }}
        />

        {/* Image area */}
        <div className="relative z-[2] mx-2 mt-1.5 overflow-hidden rounded-sm">
          <div
            className="flex items-center justify-center"
            style={{ background: getImageBg(card), aspectRatio: '16/10' }}
          >
            {card.image ? (
              <img src={card.image} alt={card.name} className="h-full w-full object-cover" />
            ) : (
              <span className="text-4xl font-black" style={{ color: 'rgba(255,255,255,0.07)' }}>
                {card.name.charAt(0)}
              </span>
            )}
          </div>
        </div>

        {/* Separator */}
        <div
          className="relative z-[2] mx-2 mt-1.5 h-px"
          style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.4)', backgroundColor: 'rgba(0,0,0,0.3)' }}
        />

        {/* Description / flavor text */}
        <div className="relative z-[2] mx-2 mt-1 flex-1 rounded-sm p-2" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <p className="text-[8px] italic leading-relaxed text-white/55">
            &ldquo;{card.description}&rdquo;
          </p>
        </div>

        {/* Separator */}
        <div
          className="relative z-[2] mx-2 mt-1 h-px"
          style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.4)', backgroundColor: 'rgba(0,0,0,0.3)' }}
        />

        {/* Footer: rarity + tier + card id */}
        <div className="relative z-[2] flex items-center justify-between px-2.5 py-1">
          <div className="flex items-center gap-1">
            <span
              className={`text-[9px] font-bold leading-none ${card.rarity === 'prismatico' ? 'animate-prismatic-text' : ''}`}
              style={card.rarity === 'prismatico' ? undefined : { color: rarityColor }}
            >
              {raritySymbols[card.rarity]}
            </span>
            <span className="text-[7px] font-semibold leading-none text-white/40">
              {RARITY_LABELS[card.rarity]}
            </span>
          </div>
          {tier && (
            <span
              className="rounded-sm px-1.5 py-[2px] text-[6px] font-bold uppercase leading-none tracking-wider"
              style={{ backgroundImage: borderGradient, color: '#333' }}
            >
              {TIER_LABELS[tier]}
            </span>
          )}
          <span className="font-mono text-[7px] leading-none text-white/25">
            {card.id.toUpperCase()}
          </span>
        </div>

        {/* Copyright inside inner card */}
        <div className="relative z-[2] pb-0.5 text-center">
          <span className="text-[5px] leading-none tracking-wider text-white/15">© DRIVA TCG</span>
        </div>
      </div>
    </div>
  )
}
