/**
 * Standalone pack visual — used by PackOpener and Shop.
 * Renders at 200×310 inside a relative container.
 * The parent must provide `position: relative` and dimensions.
 */
export function PackVisual() {
  return (
    <div className="relative" style={{ width: '200px', height: '310px' }}>
      {/* Outer metallic border - base layer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{
          background:
            'linear-gradient(160deg, #001a2e 0%, #002244 30%, #001520 70%, #002244 100%)',
        }}
      />
      {/* Outer metallic border - shimmer */}
      <div
        className="animate-holo pointer-events-none absolute inset-0 rounded-xl"
        style={{
          background:
            'linear-gradient(-72deg, rgba(0,51,85,0.6) 0%, rgba(255,255,255,0.15) 12%, rgba(0,51,85,0.4) 16%, rgba(255,255,255,0.1) 20%, rgba(0,34,68,0.8) 28%, rgba(0,51,85,0.5) 40%, rgba(255,255,255,0.08) 48%, rgba(0,51,85,0.4) 56%, rgba(255,255,255,0.12) 64%, rgba(0,51,85,0.6) 72%, rgba(255,255,255,0.06) 84%, rgba(0,34,68,0.7) 100%)',
        }}
      />
      {/* Top edge highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px] rounded-t-xl"
        style={{
          background:
            'linear-gradient(to right, transparent 10%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.12) 70%, transparent 90%)',
        }}
      />
      {/* Left edge highlight */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[3px] rounded-l-xl"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,255,255,0.1) 10%, rgba(255,255,255,0.04) 50%, transparent 90%)',
        }}
      />
      {/* Inner card */}
      <div
        className="card-font absolute inset-[4px] flex flex-col overflow-hidden rounded-lg"
        style={{
          background: 'linear-gradient(to bottom, #002a47, #001c30, #002a47)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.3)',
        }}
      >
        {/* Top decorative bar */}
        <div
          className="flex h-4 w-full items-center justify-center"
          style={{
            background:
              'linear-gradient(to right, rgba(0,51,85,0.4), rgba(240,127,45,0.2), rgba(0,51,85,0.4))',
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
        {/* Main content */}
        <div className="relative flex flex-1 flex-col items-center px-4 pt-2 pb-6">
          {/* Crosshatch pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, transparent, transparent 10px, white 10px, white 11px), repeating-linear-gradient(-45deg, transparent, transparent 10px, white 10px, white 11px)',
            }}
          />
          {/* Separator */}
          <div
            className="mb-2 h-px w-full"
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(240,127,45,0.4), transparent)',
            }}
          />
          {/* Logo area */}
          <div className="relative z-10 my-1 flex h-28 w-28 items-center justify-center">
            <div
              className="absolute inset-0 rounded-full blur-md"
              style={{
                background:
                  'radial-gradient(circle, rgba(240,127,45,0.25) 0%, rgba(0,51,85,0.3) 70%)',
              }}
            />
            <div
              className="relative h-24 w-24 overflow-hidden rounded-full"
              style={{ border: '1px solid rgba(240,127,45,0.3)' }}
            >
              <img
                src="/driva-logo.png"
                alt="Driva"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          {/* Brand name */}
          <div className="relative z-10 mt-3 flex flex-col items-center gap-1">
            <img
              src="/driva-branco.png"
              alt="Driva"
              className="h-5 object-contain"
            />
            <span
              className="text-[10px] font-semibold tracking-[0.3em]"
              style={{ color: 'rgba(240,127,45,0.7)' }}
            >
              TRADING CARDS
            </span>
          </div>
          {/* Separator */}
          <div
            className="my-3 h-px w-3/4"
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(240,127,45,0.3), transparent)',
            }}
          />
          {/* Card count badge */}
          <div
            className="rounded-full px-4 py-1"
            style={{
              border: '1px solid rgba(240,127,45,0.4)',
              background: 'rgba(240,127,45,0.1)',
            }}
          >
            <span
              className="text-[11px] font-bold tracking-wider"
              style={{ color: '#F07F2D' }}
            >
              5 CARTAS
            </span>
          </div>
        </div>
        {/* Bottom decorative bar */}
        <div
          className="flex h-4 w-full items-center justify-center"
          style={{
            background:
              'linear-gradient(to right, rgba(0,51,85,0.4), rgba(240,127,45,0.2), rgba(0,51,85,0.4))',
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
      {/* Bottom/right edge shadow */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[4px] rounded-b-xl"
        style={{
          background:
            'linear-gradient(to right, transparent 10%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.4) 70%, transparent 90%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[4px] rounded-r-xl"
        style={{
          background:
            'linear-gradient(to bottom, transparent 10%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.4) 80%, transparent 95%)',
        }}
      />
    </div>
  )
}
