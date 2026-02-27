import { DrivaCoin } from './DrivaCoin'

export type Page = 'packs' | 'mochila' | 'loja'

interface HeaderProps {
  currentPage: Page
  onNavigate: (page: Page) => void
  coins: number
}

// SVG icons as inline components
function IconPacks({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  )
}

function IconBackpack({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M8 14h8" />
      <path d="M8 18h8" />
    </svg>
  )
}

function IconShop({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
      <circle cx="7.5" cy="19.5" r="1.5" />
      <circle cx="17.5" cy="19.5" r="1.5" />
    </svg>
  )
}


export function Header({ currentPage, onNavigate, coins }: HeaderProps) {
  return (
    <header className="px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <button
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => onNavigate('packs')}
        >
          <img src="/driva-logo.png" alt="Driva" className="h-9 w-9 rounded-lg object-cover" />
          <span className="text-xl tracking-wide text-white/80">
            Trading Cards
          </span>
        </button>

        <div className="flex items-center gap-2">
          {/* Driva Coin balance */}
          <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5" title="Driva Coins">
            <DrivaCoin scale={0.14} />
            <span className="font-mono text-sm font-bold text-amber-300">{coins}</span>
          </div>

          <nav className="flex gap-1">
            <NavIcon
              active={currentPage === 'packs'}
              onClick={() => onNavigate('packs')}
              icon={<IconPacks className="h-5 w-5" />}
              label="Packs"
            />
            <NavIcon
              active={currentPage === 'mochila'}
              onClick={() => onNavigate('mochila')}
              icon={<IconBackpack className="h-5 w-5" />}
              label="Mochila"
            />
            <NavIcon
              active={currentPage === 'loja'}
              onClick={() => onNavigate('loja')}
              icon={<IconShop className="h-5 w-5" />}
              label="Loja"
              highlight
            />
          </nav>
        </div>
      </div>
    </header>
  )
}

function NavIcon({
  active,
  onClick,
  icon,
  label,
  highlight,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
  highlight?: boolean
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`rounded-lg p-2.5 transition-colors ${
        active
          ? highlight
            ? 'bg-[#F07F2D] text-white'
            : 'bg-white/15 text-white'
          : highlight
            ? 'text-[#F07F2D] hover:bg-white/10'
            : 'text-white/40 hover:bg-white/10 hover:text-white/80'
      }`}
    >
      {icon}
    </button>
  )
}
