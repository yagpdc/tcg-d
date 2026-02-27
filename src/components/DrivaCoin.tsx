/**
 * Animated 3D gold coin with Driva branding.
 * Accepts an optional `scale` prop (default 1) to resize.
 * The outer wrapper matches the visual size so layout is correct.
 */
export function DrivaCoin({ scale = 1 }: { scale?: number }) {
  const size = 150 * scale

  return (
    <div style={{ width: `${size}px`, height: `${size}px`, position: 'relative' }}>
      <div
        className="dc-coin"
        style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
      >
        <div className="dc-front">
          <span className="dc-currency">DC</span>
          <div className="dc-shapes">
            <div className="dc-shape-l" />
            <div className="dc-shape-r" />
            <span className="dc-label-top">Driva</span>
            <span className="dc-label-bottom">Coin</span>
          </div>
        </div>
      </div>
    </div>
  )
}
