// Filtros SVG de desenfoque direccional para el motion blur (ver keyframes en styles/tokens.css).
// `y` desenfoca solo en vertical y `x` solo en horizontal; 3 es el más fuerte.
export default function MotionFilters() {
  const steps = [
    [1, 1.5],
    [2, 3.5],
    [3, 6],
  ] as const
  return (
    <svg aria-hidden width="0" height="0" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
      <defs>
        {steps.map(([n, d]) => (
          <filter key={`y${n}`} id={`mb-y-${n}`} x="-10%" y="-30%" width="120%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={`0 ${d}`} />
          </filter>
        ))}
        {steps.map(([n, d]) => (
          <filter key={`x${n}`} id={`mb-x-${n}`} x="-30%" y="-10%" width="160%" height="120%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={`${d} 0`} />
          </filter>
        ))}
      </defs>
    </svg>
  )
}
